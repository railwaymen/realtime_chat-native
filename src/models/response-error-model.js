export default class ResponseErrorModel {
  constructor({name, status, message, fullMessage, response}) {
    this.name = name;
    this.status = status;
    this.message = message;
    this.fullMessage = fullMessage;
    this.response = response;
  }
}
