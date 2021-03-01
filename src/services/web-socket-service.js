import {WEBSOCKET_PATH} from '@env';
import CustomAsyncStorage from '../helpers/custom-async-storage';
import BasicAuth from '../helpers/basic-auth';
import SocketMessage from '../helpers/socket-message';

export default class WebSocketService {
  static establishConnection = async () => {
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

    let webSocket = new WebSocket(WEBSOCKET_PATH, null, {
      headers,
    });

    webSocket.onopen = () => {
      webSocket.send(JSON.stringify(appSubscribe));
      webSocket.send(JSON.stringify(userSubscribe));
    };

    return webSocket;
  };
}
