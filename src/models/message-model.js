import {API_SERVER_PATH} from '@env';
import formatDate from '../helpers/format-date';

export default class MessageModel {
  constructor({
    id,
    user_id,
    room_id,
    body,
    edited,
    deleted,
    user,
    attachments,
    created_at,
  }) {
    this.id = id;
    this.userId = user_id;
    this.roomId = room_id;
    this.body = body;
    this.edited = edited;
    this.deleted = deleted;
    this.user = new UserModel(user);
    this.attachments = new AttachmentsModel(attachments);
    this.createdAt = created_at && formatDate(created_at);
  }
}

class UserModel {
  constructor({id, username, email, avatar_url}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatarUrl = avatar_url ? API_SERVER_PATH + avatar_url : undefined;
  }
}

class AttachmentsModel {
  constructor({
    id,
    content_type,
    file_size,
    identifier,
    url,
    thumb_url,
    created_at,
  }) {
    this.id = id;
    this.contentType = content_type;
    this.fileSize = file_size;
    this.identifier = identifier;
    this.url = url;
    this.thumbUrl = thumb_url;
    this.createdAt = created_at;
  }
}
