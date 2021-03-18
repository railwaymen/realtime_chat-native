import AuthService from './auth-service';
import AttachmentModel from '../models/attachment-model';

export default class AttachmentsService {
  static uploadAttachment = (imagePath) => {
    const form = new FormData();

    const file = {
      uri: imagePath,
      type: 'image/jpg',
      name: `file-${Date.now()}.jpg`,
    };

    form.append('file', file);

    return AuthService.post({
      url: `attachments`,
      body: form,
      additionalHeaderParams: {
        'Content-Type': 'multipart/form-data',
      },
      isStringify: false,
    }).then((res) => new AttachmentModel(res));
  };

  static removeAttachment = (attachmentId) => {
    return AuthService.delete({
      url: `attachments/${attachmentId}`,
    });
  };
}
