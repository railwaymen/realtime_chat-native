import UserModel from '../models/user-model';

export default class MemberModel {
  constructor({id, user_id, room_id, user}) {
    this.id = id;
    this.userId = user_id;
    this.roomId = room_id;
    this.user = new UserModel(user);
  }
}
