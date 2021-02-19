import AuthService from './auth-service';
import RoomModel from '../models/room-model';
import {WEBSOCKET_PATH} from '@env';
import CustomAsyncStorage from '../helpers/custom-async-storage';
import BasicAuth from '../helpers/basic-auth';
import SocketMessage from '../helpers/socket-message';

export default class RoomsService {
  static getRooms = () => {
    return AuthService.get({
      url: 'rooms',
    }).then((rooms) => rooms.map((room) => new RoomModel(room)));
  };

  static updateRoom = ({roomId, name, description}) => {
    return AuthService.put({
      url: `rooms/${roomId}`,
      body: {name, description},
    }).then((room) => new RoomModel(room));
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

    webSocket.onopen = () => {
      webSocket.send(JSON.stringify(appSubscribe));
      webSocket.send(JSON.stringify(userSubscribe));
      webSocket.send(JSON.stringify(channelSubscribe));
    };

    return webSocket;
  };
}
