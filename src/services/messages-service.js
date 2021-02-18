import AuthService from './auth-service';
import RoomModel from '../models/room-model';
import MessageModel from '../models/message-model';
import {WEBSOCKET_PATH} from '@env';
import {ActionCable, Cable} from '@kesha-antonov/react-native-action-cable';
import CustomAsyncStorage from '../helpers/custom-async-storage';
import BasicAuth from '../helpers/basic-auth';
import SocketMessage from '../helpers/socket-message';

export default class MessagesService {
  static getRooms = () => {
    return AuthService.get({
      url: 'rooms',
    }).then((rooms) => rooms.map((room) => new RoomModel(room)));
  };

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

  static roomWebSocketSubscribe = async (roomId) => {
    const {authenticationToken} = await CustomAsyncStorage.get();

    const headers = {
      Token: authenticationToken,
      ...BasicAuth(),
    };

    const appSubscribe = SocketMessage.getBasicsSocketSubscription({
      channel: 'AppChannel',
    });

    const userSubscribe = SocketMessage.getBasicsSocketSubscription({
      channel: 'UserChannel',
    });

    const channelSubscribe = SocketMessage.getBasicsSocketSubscription({
      roomId,
    });

    let webSocket = new WebSocket(WEBSOCKET_PATH, null, {
      headers,
    });

    webSocket.onopen = (e) => {
      webSocket.send(JSON.stringify(appSubscribe));
      webSocket.send(JSON.stringify(userSubscribe));
      webSocket.send(JSON.stringify(channelSubscribe));
    };

    return webSocket;
  };
}
