import React, {useState, useRef, useContext} from 'react';

import WebSocketContext from '../context/web-socket-context';
import WebSocketService from '../services/web-socket-service';
import SocketMessage from '../helpers/socket-message';
import MessageModel from '../models/message-model';
import UserContext from '../context/user-context';

export default function WebSocketHook({children}) {
  const webSocket = useRef(null);
  const [unreadRoomsIdsStatus, setUnreadRoomsIdsStatus] = useState([]);
  const {updateRoomActivity} = useContext(UserContext);

  const handleWebSocket = async () => {
    webSocket.current = await WebSocketService.establishConnection();
    basicSocketEventsBehavior();
  };

  const basicSocketEventsBehavior = () => {
    webSocket.current.onmessage = ({data}) => {
      const {message} = JSON.parse(data);

      const messageData = message?.data && new MessageModel(message?.data);

      const messageType = message?.type;

      if (messageType === 'room_message_create') {
        const {roomId} = messageData;
        pushUnreadRoomIdStatus(roomId);
      }
    };
    webSocket.current.onerror = (e) => {
      console.log('error');
      console.log(e);
      console.log(e.message);
    };
    webSocket.current.onclose = (e) => {
      console.log('closed');
      console.log(e);
      console.log(e.message);
    };
  };

  const subscribeRoomChannel = (roomId) => {
    const channelSubscribe = SocketMessage.getBasicsSocketSubscription({
      roomId,
    });

    webSocket.current.send(JSON.stringify(channelSubscribe));
  };

  const pushUnreadRoomIdStatus = (roomId) => {
    setUnreadRoomsIdsStatus((prevState) => prevState.concat(roomId));
  };

  const removeUnreadRoomIdStatus = (idToRemove) => {
    updateRoomActivity(idToRemove);

    setUnreadRoomsIdsStatus((prevState) =>
      prevState.filter((roomId) => roomId !== idToRemove),
    );
  };

  return (
    <WebSocketContext.Provider
      value={{
        webSocket,
        handleWebSocket,
        basicSocketEventsBehavior,
        subscribeRoomChannel,
        unreadRoomsIdsStatus,
        removeUnreadRoomIdStatus,
      }}>
      {children}
    </WebSocketContext.Provider>
  );
}
