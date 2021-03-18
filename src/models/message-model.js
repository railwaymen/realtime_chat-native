import AttachmentModel from '../models/attachment-model';
import UserModel from '../models/user-model';

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
    this.user = new UserModel(user || {});
    this.attachments = attachments?.map(
      (attachment) => new AttachmentModel(attachment || {}),
    );
    this.createdAt = created_at;
  }
}
