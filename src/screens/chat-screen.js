import React, {Component, createRef} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import mainColors from '../styles/main-colors';
import MessagesService from '../services/messages-service';
import RoomsService from '../services/rooms-service';
import AttachmentsService from '../services/attachments-services';
import ChatContainer from '../components/messages/chat-container';
import MessageModel from '../models/message-model';
import SocketMessage from '../helpers/socket-message';
import WebSocketContext from '../context/web-socket-context';
import ImageActionSheet from '../components/upload-images/image-action-sheet';
import imagePickerAction from '../components/upload-images/image-picker-action';
import actionSheetButtonsProp from '../helpers/action-sheet-buttons-prop';

const actionSheetRef = createRef();

const selectEventType = ({message, type}) => {
  if (message?.message === 'typing') {
    return message.message;
  } else if (message?.type) {
    return message.type;
  }
  return type;
};

export default class ChatScreen extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      inputMessage: '',
      isLoading: true,
      typingUser: {},
      attachments: [],
      actionSheetProp: [],
      isModalVisible: false,
      editedMessage: new MessageModel({}),
    };
  }
  static contextType = WebSocketContext;

  setActionSheetVisibility = ({
    isMessagePressed = false,
    editedMessage = {},
  }) => {
    const {id: messageId} = editedMessage;

    const onClickActions = isMessagePressed
      ? {
          onPressFirstOption: this.setEditModalVisibility,
          onPressSecondOption: () => this.removeMessage(messageId),
          isMessagePressed,
        }
      : {
          onPressFirstOption: () => this.handleImagePicker('camera'),
          onPressSecondOption: () => this.handleImagePicker('picker'),
          isMessagePressed,
        };

    if (isMessagePressed) {
      this.setState({editedMessage});
    }

    const preparedActionSheetProp = actionSheetButtonsProp({
      ...onClickActions,
      changeActionSheetState: this.changeActionSheetState,
    });
    this.setState({actionSheetProp: preparedActionSheetProp});

    this.changeActionSheetState();
  };

  changeActionSheetState = () => {
    actionSheetRef.current?.setModalVisible();
  };

  componentDidMount() {
    const {
      props: {
        navigation: {setParams},
      },
      setActionSheetVisibility,
    } = this;

    setParams({
      setActionSheetVisibility,
    });

    this.websocketHandler();
  }

  componentWillUnmount() {
    const {
      props: {
        route: {
          params: {
            roomDetails: {id: roomId},
          },
        },
      },
      context: {removeUnreadRoomIdStatus, basicSocketEventsBehavior},
    } = this;

    removeUnreadRoomIdStatus(roomId);
    basicSocketEventsBehavior();
    RoomsService.updateRoomActivity(roomId);
  }

  websocketHandler = async () => {
    const {
      props: {
        route: {
          params: {
            roomDetails: {id: roomId},
          },
        },
      },
      context: {webSocket, subscribeRoomChannel},
    } = this;

    if (roomId) {
      await subscribeRoomChannel(roomId);
      await this.getMessages({roomId}).then(() =>
        this.setState({
          isLoading: false,
        }),
      );
    }

    webSocket.current.onmessage = ({data}) => {
      const {type, message} = JSON.parse(data);
      console.log('chat:', type, message);
      const eventType = selectEventType({message, type});

      switch (eventType) {
        case 'confirm_subscription':
          MessagesService.getMessages(roomId).then((res) => {
            this.setState({messages: res.reverse(), isLoading: false});
          });
          break;
        case 'room_message_create':
          if (roomId !== message.data.room_id) {
            return;
          }
          const {data: messageData} = message;
          const newMessage = new MessageModel(messageData);
          this.setState((prevState) => {
            return {
              ...prevState,
              messages: [newMessage].concat(prevState.messages),
            };
          });
          break;
        case 'typing':
          const {typing, user} = message;
          this.setState({typingUser: typing ? user : {}});
          break;
      }
    };
  };

  getMessages = ({roomId, lastMessageId = null}) => {
    return MessagesService.getMessages({roomId, lastMessageId}).then((res) => {
      const filteredByDeleted = res.filter(({deleted}) => !deleted);

      this.setState((prevState) => {
        return {
          messages: prevState.messages.concat(filteredByDeleted.reverse()),
        };
      });
    });
  };

  updateInputMessage = (value) => {
    this.updateIsTyping(value.length);
    this.setState({inputMessage: value});
  };

  sendMessage = () => {
    const {
      state: {inputMessage = '', attachments},
      props: {
        route: {
          params: {
            roomDetails: {id: roomId},
          },
        },
      },
    } = this;

    const attachmentsIds = attachments?.map(({id}) => id);

    return MessagesService.sendMessage({
      roomId,
      message: inputMessage,
      attachmentsIds,
    }).then(() => {
      this.updateIsTyping();
      this.setState({inputMessage: '', attachments: []});
    });
  };

  updateIsTyping = (isTyping = false) => {
    const {
      props: {
        route: {
          params: {
            roomDetails: {id: roomId},
          },
        },
      },
      context: {webSocket},
    } = this;

    const isTypingSocketMessage = SocketMessage.userIsTyping({
      roomId,
      typing: isTyping,
    });

    return webSocket.current.send(JSON.stringify(isTypingSocketMessage));
  };

  onEndReached = () => {
    const {
      props: {
        route: {
          params: {
            roomDetails: {id: roomId},
          },
        },
      },
      state: {messages},
    } = this;

    const {id: lastMessageId} = messages[messages.length - 1];

    return this.getMessages({roomId, lastMessageId});
  };

  handleImagePicker = async (selectedOption) => {
    const {path} = await imagePickerAction(selectedOption);

    this.changeActionSheetState();

    return AttachmentsService.uploadAttachment(path).then((attachment) => {
      this.setState((prevState) => ({
        attachments: [attachment].concat(prevState.attachments),
      }));
    });
  };

  onRemoveAttachment = (attachmentId) => {
    return AttachmentsService.removeAttachment(attachmentId).then(() =>
      this.setState((prevState) => ({
        attachments: prevState.attachments.filter(
          ({id}) => id !== attachmentId,
        ),
      })),
    );
  };

  removeMessage = (messageId) => {
    return MessagesService.deleteMessage(messageId).then(() => {
      this.changeActionSheetState();

      this.setState((prevState) => {
        return {
          messages: prevState.messages.filter(({id}) => id !== messageId),
        };
      });
    });
  };

  setEditModalVisibility = () => {
    this.setState((prevState) => {
      return {
        isModalVisible: !prevState.isModalVisible,
      };
    });
  };

  onEditedMessageSave = ({messageId, message}) => {
    return MessagesService.updateMessage({messageId, message}).then(
      (updatedMessage) => {
        this.setState((prevState) => {
          const replacedMessage = prevState.messages.map((message) =>
            message.id === messageId ? updatedMessage : message,
          );

          return {
            messages: replacedMessage,
          };
        });
      },
    );
  };

  render() {
    const {
      messages,
      inputMessage,
      isLoading,
      typingUser,
      attachments,
      actionSheetProp,
      isModalVisible,
      editedMessage,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ChatContainer
          messages={messages}
          attachments={attachments}
          inputMessage={inputMessage}
          updateInputMessage={this.updateInputMessage}
          sendMessage={this.sendMessage}
          isLoading={isLoading}
          typingUser={typingUser}
          onEndReached={this.onEndReached}
          onRemoveAttachment={this.onRemoveAttachment}
          setActionSheetVisibility={this.setActionSheetVisibility}
        />
        <ImageActionSheet
          actionSheetRef={actionSheetRef}
          preparedActionSheetProp={actionSheetProp}
          isEditModalVisible={isModalVisible}
          setEditModalVisibility={this.setEditModalVisibility}
          changeActionSheetState={this.changeActionSheetState}
          onEditedMessageSave={this.onEditedMessageSave}
          editedMessage={editedMessage}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: mainColors.lightGray,
  },
});
