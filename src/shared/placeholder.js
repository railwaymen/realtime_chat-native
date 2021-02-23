import React from 'react';
import {View} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserSecret} from '@fortawesome/free-solid-svg-icons/';

export default function Placeholder({
  iconColor,
  iconSize,
  containerStyle = {},
}) {
  return (
    <View style={containerStyle}>
      <FontAwesomeIcon icon={faUserSecret} color={iconColor} size={iconSize} />
    </View>
  );
}
