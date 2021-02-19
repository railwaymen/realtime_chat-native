import AuthService from './auth-service';

import MessageModel from '../models/message-model';

export default class MessagesService {
  static getMessages = (roomId) => {
    return AuthService.get({
      url: `rooms/${roomId}/messages`,
    }).then((messages) => messages.map((message) => new MessageModel(message)));
  };

  static sendMessage = ({roomId, message}) => {
    return AuthService.post({
      url: `rooms/${roomId}/messages`,
      body: {body: message},
    }).then((message) => new MessageModel(message));
  };
}
