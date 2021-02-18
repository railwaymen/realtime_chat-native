import formatDate from '../helpers/format-date';

export default class RoomModel {
  constructor({
    id,
    channel_name,
    deleted,
    description,
    last_message_at,
    name,
    participans,
    room_path,
    type,
    user_id,
  }) {
    this.id = id;
    this.channelName = channel_name;
    this.deleted = deleted;
    this.description = description;
    this.lastMessageAt = last_message_at && formatDate(last_message_at);
    this.name = name;
    this.participans = participans;
    this.roomPath = room_path;
    this.type = type;
    this.userId = user_id;
  }
}
