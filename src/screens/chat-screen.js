import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import mainColors from '../styles/main-colors';
import MessagesService from '../services/messages-service';
import UserContext from '../context/user-context';
import ChatContainer from '../components/messages/chat-container';
import MessageModel from '../models/message-model';
import SocketMessage from '../helpers/socket-message';

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
      webSocket: null,
      typingUser: {},
    };
  }
  static contextType = UserContext;

  componentDidMount() {
    this.websocketHandler();
  }

  componentWillUnmount() {
    const {webSocket} = this.state;
    webSocket.close();
  }

  websocketHandler = async () => {
    const {
      route: {
        params: {roomId},
      },
    } = this.props;

    const webSocket = await MessagesService.roomWebSocketSubscribe(roomId);
    this.setState({webSocket});

    webSocket.onmessage = ({data}) => {
      const {type, message} = JSON.parse(data);

      const eventType = selectEventType({message, type});

      switch (eventType) {
        case 'confirm_subscription':
          MessagesService.getMessages(roomId).then((res) => {
            this.setState({messages: res.reverse(), isLoading: false});
          });
          break;
        case 'room_message_create':
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

    webSocket.onerror = (e) => {
      console.log('error');
      console.log(e);
      console.log(e.message);
    };

    webSocket.onclose = (e) => {
      console.log('closed');
      console.log(e);
      console.log(e.code, e.reason);
    };
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
          params: {roomId},
        },
      },
    } = this;
    console.log(roomId, inputMessage);
    return MessagesService.sendMessage({
      roomId,
      message: inputMessage,
    }).then(() => this.setState({inputMessage: ''}));
  };

  updateIsTyping = (isTyping = false) => {
    const {
      state: {webSocket},
      props: {
        route: {
          params: {roomId},
        },
      },
    } = this;
    const isTypingSocketMessage = SocketMessage.userIsTyping({
      roomId,
      typing: isTyping,
    });

    webSocket.send(JSON.stringify(isTypingSocketMessage));
  };

  render() {
    const {
      loggedUserProfile: {id: loggedUserId},
    } = this.context;
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
