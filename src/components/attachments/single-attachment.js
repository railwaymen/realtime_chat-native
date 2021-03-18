import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import AvatarPlaceholder from '../images/avatar-placeholder';

import mainColors from '../../styles/main-colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

export default function SingleAttachment({
  attachment: {id, thumbUrl} = {},
  onRemoveAttachment,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.removeIcon}
        onPress={() => onRemoveAttachment(id)}>
        <FontAwesomeIcon
          icon={faTrash}
          size={15}
          color={mainColors.lightGray}
        />
      </TouchableOpacity>
      <AvatarPlaceholder
        url={thumbUrl}
        iconColor={mainColors.darkGray}
        iconSize={60}
        containerStyle={styles.iconContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 20,
  },
  removeIcon: {
    position: 'absolute',
    backgroundColor: mainColors.darkRed,
    zIndex: 100,
    right: 0,
    marginTop: -10,
    width: 30,
    aspectRatio: 1,
    borderRadius: 15,
    marginRight: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerStyle: {
    width: 100,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
