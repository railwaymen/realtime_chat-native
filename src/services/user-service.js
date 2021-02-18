import ApiService from './api-service';
import AuthorizationService from './auth-service';
import AuthModel from '../models/auth-model';
import UserModel from '../models/user-model';

export default class UserService {
  static login = ({email, password}) => {
    return ApiService.basicRequest({
      method: 'POST',
      url: 'authentications',
      body: {email, password},
    }).then((res) => new AuthModel(res));
  };

  static getLoggedUserProfile = () => {
    return AuthorizationService.get({
      url: 'users/profile',
    }).then((userProfile) => new UserModel(userProfile));
  };
}
