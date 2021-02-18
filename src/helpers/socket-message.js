export default class SocketMessage {
  static getBasicsSocketSubscription = ({
    command = 'subscribe',
    channel = 'RoomChannel',
    roomId,
  }) => {
    let identifier = {
      channel,
    };
    if (roomId) {
      identifier.room_id = roomId;
    }

    return {
      command,
      identifier: JSON.stringify(identifier),
    };
  };

  static userIsTyping = ({roomId, typing}) => {
    const subscription = SocketMessage.getBasicsSocketSubscription({
      roomId,
      command: 'message',
    });
    const data = JSON.stringify({
      typing,
      room_id: roomId,
      action: 'user_typing',
    });

    return {...subscription, data};
  };
}
