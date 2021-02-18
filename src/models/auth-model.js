export default class AuthModel {
  constructor({id, email, authentication_token, refresh_token}) {
    this.id = id;
    this.email = email;
    this.authenticationToken = authentication_token;
    this.refreshToken = refresh_token;
  }
}
