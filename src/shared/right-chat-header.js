import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faUsersCog, faSearch} from '@fortawesome/free-solid-svg-icons';
import mainColors from '../styles/main-colors';
import FormInput from '../components/form-input';

export default function RightChatHeader({
  navigate,
  isEditMembersEnabled,
  roomDetails,
  setActionSheetVisibility,
}) {
  const editRoomHandler = () => {
    navigate('EditRoomMembersScreen', {
      headerTitle: 'Edit Members',
      roomDetails,
    });
  };

  const navigateToSearchScreen = () => {
    const {id: roomId} = roomDetails;

    navigate('SearchMessagesScreen', {
      headerTitle: 'Find Message',
      roomId,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToSearchScreen}>
        <FontAwesomeIcon size={22} style={styles.icon} icon={faSearch} />
      </TouchableOpacity>
      <TouchableOpacity onPress={setActionSheetVisibility}>
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
