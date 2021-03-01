import React, {useState, useRef} from 'react';

import WebSocketContext from '../context/web-socket-context';
import WebSocketService from '../services/web-socket-service';
import SocketMessage from '../helpers/socket-message';
import MessageModel from '../models/message-model';

export default function WebSocketHook({children}) {
  const webSocket = useRef(null);
  const [subscribedRoomChannelId, setSubscribedRoomChannelId] = useState(null);
  const [unreadRoomsIdsStatus, setUnreadRoomsIdsStatus] = useState([]);

  const handleWebSocket = async () => {
    webSocket.current = await WebSocketService.establishConnection();
    basicSocketEventsBehavior();
  };

  const basicSocketEventsBehavior = () => {
    webSocket.current.onmessage = ({data}) => {
      const {message} = JSON.parse(data);

      const messageData = message?.data && new MessageModel(message?.data);

      const messageType = message?.type;

      if (
        messageType === 'room_message_create' &&
        messageData?.roomId !== subscribedRoomChannelId
      ) {
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
    setSubscribedRoomChannelId(roomId);
  };

  const pushUnreadRoomIdStatus = (roomId) => {
    setUnreadRoomsIdsStatus((prevState) => prevState.concat(roomId));
  };

  const removeUnreadRoomIdStatus = (idToRemove) => {
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
        setSubscribedRoomChannelId,
        unreadRoomsIdsStatus,
        removeUnreadRoomIdStatus,
      }}>
      {children}
    </WebSocketContext.Provider>
  );
}
