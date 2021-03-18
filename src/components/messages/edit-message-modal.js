import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons/';
import mainColors from '../../styles/main-colors';
import FormInput from '../form-input';
import CustomButton from '../../shared/custom-buttom';

export default function EditMessageModal({
  isEditModalVisible,
  setEditModalVisibility,
  changeActionSheetState,
  onEditedMessageSave,
  editedMessage: {body, id: messageId},
}) {
  const [message, setMessage] = useState(body);

  const onClose = () => {
    setEditModalVisibility();
    changeActionSheetState();
  };

  const onSave = async () => {
    await onEditedMessageSave({messageId, message});

    onClose();
  };

  return (
    <Modal visible={isEditModalVisible} animationType="slide">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
          <FontAwesomeIcon
            icon={faTimes}
            color={mainColors.darkGray}
            size={30}
          />
        </TouchableOpacity>
        <View style={styles.content}>
          <FormInput
            onChange={({value}) => setMessage(value)}
            placeholder="Your Message"
            value={message}
            name="message"
            label="Message"
            multiline
            labelStyle={styles.labelStyle}
            inputTextColor={mainColors.darkGray}
          />
          <CustomButton title="Save" onPress={onSave} />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: mainColors.lightGray,
  },
  content: {
    flex: 0.5,
    justifyContent: 'space-between',
  },
  closeContainer: {
    alignItems: 'flex-end',
    margin: 10,
  },
  labelStyle: {
    color: mainColors.darkGray,
  },
});
