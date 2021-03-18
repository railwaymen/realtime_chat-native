import React from 'react';
import {Image} from 'react-native';
import BasicAuth from '../helpers/basic-auth';

const BasicAuthImage = ({
  url = '',
  style = {},
  imageKey,
  setDisplayImage = () => {},
}) => {
  return (
    <Image
      style={style}
      key={imageKey}
      source={{
        uri: url,
        headers: BasicAuth(),
      }}
      onError={() => setDisplayImage(false)}
    />
  );
};
export default BasicAuthImage;
