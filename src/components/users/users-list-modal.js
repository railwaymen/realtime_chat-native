import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';

import UsersList from '../../components/users/users-list';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons/';
import mainColors from '../../styles/main-colors';
import CustomButton from '../../shared/custom-buttom';

export default function UsersListModal({
  isModalVisible = false,
  setIsModalVisible,
  users = [],
  selectNewUser,
  onSave,
}) {
  const onClose = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
            <FontAwesomeIcon
              icon={faTimes}
              color={mainColors.lightGray}
              size={30}
            />
          </TouchableOpacity>
          <UsersList users={users} onPress={selectNewUser} isMarkEnabled />
          <CustomButton title="Save" onPress={onSave} />
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColors.black,
  },
  closeContainer: {
    alignItems: 'flex-end',
    margin: 10,
  },
});
