import {API_SERVER_PATH} from '@env';

export default class UserModel {
  constructor({id, username, email, rooms_activity, avatar_url}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roomsActivity = rooms_activity;
    this.avatarUrl = avatar_url ? API_SERVER_PATH + avatar_url : undefined;
    this.imageKey = Date.now();
  }
}
