import {API_SERVER_PATH} from '@env';

export default class AttachmentModel {
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
    this.url = url && API_SERVER_PATH + url;
    this.thumbUrl = thumb_url && API_SERVER_PATH + thumb_url;
    this.createdAt = created_at;
  }
}
