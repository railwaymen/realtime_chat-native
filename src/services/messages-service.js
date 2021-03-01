import AuthService from './auth-service';

import MessageModel from '../models/message-model';

export default class MessagesService {
  static getMessages = ({roomId, lastMessageId}) => {
    const endPoint = `rooms/${roomId}/messages`;

    const url = lastMessageId
      ? endPoint + `?last_id=${lastMessageId}`
      : endPoint;

    return AuthService.get({
      url,
    }).then((messages) => messages.map((message) => new MessageModel(message)));
  };

  static sendMessage = ({roomId, message}) => {
    return AuthService.post({
      url: `rooms/${roomId}/messages`,
      body: {body: message},
    }).then((message) => new MessageModel(message));
  };
}
