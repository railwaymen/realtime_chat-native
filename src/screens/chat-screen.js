import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import mainColors from '../styles/main-colors';
import MessagesService from '../services/messages-service';
import ChatContainer from '../components/messages/chat-container';
import MessageModel from '../models/message-model';
import SocketMessage from '../helpers/socket-message';
import WebSocketContext from '../context/web-socket-context';

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
    };
  }
  static contextType = WebSocketContext;

  componentDidMount() {
    const {
      props: {
        route: {
          params: {
            roomDetails: {id: roomId},
          },
        },
      },
      context: {removeUnreadRoomIdStatus},
    } = this;

    removeUnreadRoomIdStatus(roomId);
    this.websocketHandler();
  }

  componentWillUnmount() {
    const {
      setSubscribedRoomChannelId,
      basicSocketEventsBehavior,
    } = this.context;

    setSubscribedRoomChannelId(null);
    basicSocketEventsBehavior();
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

    await subscribeRoomChannel(roomId);
    await this.getMessages({roomId}).then(() =>
      this.setState({
        isLoading: false,
      }),
    );

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
      this.setState((prevState) => {
        return {
          messages: prevState.messages.concat(res.reverse()),
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
      state: {inputMessage},
      props: {
        route: {
          params: {
            roomDetails: {id: roomId},
          },
        },
      },
    } = this;

    return MessagesService.sendMessage({
      roomId,
      message: inputMessage,
    }).then(() => {
      this.updateIsTyping();
      this.setState({inputMessage: ''});
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

  render() {
    const {messages, inputMessage, isLoading, typingUser} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ChatContainer
          messages={messages}
          inputMessage={inputMessage}
          updateInputMessage={this.updateInputMessage}
          sendMessage={this.sendMessage}
          isLoading={isLoading}
          typingUser={typingUser}
          onEndReached={this.onEndReached}
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
