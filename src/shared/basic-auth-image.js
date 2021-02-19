import React from 'react';
import {Image} from 'react-native';
import BasicAuth from '../helpers/basic-auth';

const BasicAuthImage = ({url = '', style = {}}) => {
  return (
    <Image
      style={style}
      source={{
        uri: url,
        headers: BasicAuth(),
      }}
    />
  );
};
export default BasicAuthImage;
