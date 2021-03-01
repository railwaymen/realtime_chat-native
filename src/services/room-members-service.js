import AuthService from './auth-service';
import MemberModel from '../models/member-model';

export default class RoomMembersService {
  static getMembers = (roomId) => {
    return AuthService.get({
      url: `rooms/${roomId}/rooms_users`,
    }).then((members) => members.map((member) => new MemberModel(member)));
  };
  static removeMember = (id) => {
    return AuthService.delete({
      url: `rooms_users/${id}`,
    });
  };
}
