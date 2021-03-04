import AuthService from './auth-service';
import RoomModel from '../models/room-model';

export default class RoomsService {
  static getRooms = () => {
    return AuthService.get({
      url: 'rooms',
    }).then((rooms) => rooms.map((room) => new RoomModel(room)));
  };

  static createRoom = (body) => {
    return AuthService.post({
      url: `rooms/`,
      body,
    }).then((room) => new RoomModel(room));
  };

  static updateRoom = ({roomId, name, description, userIds}) => {
    const body = userIds
      ? {name, description, users_ids: userIds}
      : {name, description};

    return AuthService.put({
      url: `rooms/${roomId}`,
      body,
    }).then((room) => new RoomModel(room));
  };

  static removeRoom = (roomId) => {
    return AuthService.delete({
      url: `rooms/${roomId}`,
    });
  };

  static updateRoomActivity = (roomId) => {
    return AuthService.post({
      url: `rooms/${roomId}/update_activity`,
    });
  };
}
