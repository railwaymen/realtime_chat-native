import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faUsersCog} from '@fortawesome/free-solid-svg-icons';
import mainColors from '../styles/main-colors';

export default function RightChatHeader({
  navigate,
  isEditMembersEnabled,
  roomDetails,
}) {
  const editRoomHandler = () => {
    navigate('EditRoomMembersScreen', {
      headerTitle: 'Edit Members',
      roomDetails,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <FontAwesomeIcon size={22} style={styles.icon} icon={faPlus} />
      </TouchableOpacity>
      {isEditMembersEnabled && (
        <TouchableOpacity onPress={editRoomHandler}>
          <FontAwesomeIcon size={22} style={styles.icon} icon={faUsersCog} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: -10,
  },
  icon: {
    color: mainColors.sand,
    marginHorizontal: 12,
  },
});
