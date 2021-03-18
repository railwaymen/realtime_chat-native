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

  static sendMessage = ({roomId, message, attachmentsIds}) => {
    const body =
      `body=${message}&` +
      attachmentsIds
        ?.map((id) => `attachment_ids=${encodeURIComponent(id)}`)
        ?.join('&');

    return AuthService.post({
      url: `rooms/${roomId}/messages`,
      body: body,
      additionalHeaderParams: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      isStringify: false,
    }).then((message) => new MessageModel(message));
  };

  static updateMessage = ({messageId, message}) => {
    return AuthService.put({
      url: `messages/${messageId}`,
      body: `body=${message}`,
      additionalHeaderParams: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      isStringify: false,
    }).then((message) => new MessageModel(message));
  };

  static deleteMessage = (messageId) => {
    return AuthService.delete({
      url: `messages/${messageId}`,
    });
  };

  static searchMessagesForCurrentRoom = ({phrase, lastMessageId, roomId}) => {
    const endPointWithPhrase = `messages/search?phrase=${phrase}`;

    const url = lastMessageId
      ? endPointWithPhrase + `?last_id=${lastMessageId}`
      : endPointWithPhrase;

    return AuthService.get({
      url,
    }).then((messages) =>
      messages
        //  .filter(({room_id}) => room_id === roomId)
        .map((message) => new MessageModel(message)),
    );
  };
}
