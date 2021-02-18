import {API_BASIC_AUTH_LOGIN, API_BASIC_AUTH_PASSWORD} from '@env';
import base64 from 'react-native-base64';

const BasicAuth = () => {
  const auth = base64.encode(
    `${API_BASIC_AUTH_LOGIN}:${API_BASIC_AUTH_PASSWORD}`,
  );

  return {
    Authorization: `Basic ${auth}`,
  };
};

export default BasicAuth;
