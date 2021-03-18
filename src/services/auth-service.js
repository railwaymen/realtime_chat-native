import ApiService from './api-service';
import CustomAsyncStorage from '../helpers/custom-async-storage';

export default class AuthService {
  static get = async ({url}) => {
    const token = await setActiveToken();
    return ApiService.basicRequest({method: 'GET', url, token});
  };
  static post = async ({
    url,
    body = {},
    additionalHeaderParams,
    isStringify,
  }) => {
    const token = await setActiveToken();
    return ApiService.basicRequest({
      method: 'POST',
      url,
      token,
      body,
      additionalHeaderParams,
      isStringify,
    });
  };
  static put = async ({url, body, additionalHeaderParams, isStringify}) => {
    const token = await setActiveToken();
    return ApiService.basicRequest({
      method: 'PUT',
      url,
      token,
      body,
      additionalHeaderParams,
      isStringify,
    });
  };
  static delete = async ({url, body}) => {
    const token = await setActiveToken();
    return ApiService.basicRequest({method: 'DELETE', url, token, body});
  };
}

const setActiveToken = async () => {
  const {authenticationToken} = await CustomAsyncStorage.get();

  return authenticationToken;
};
