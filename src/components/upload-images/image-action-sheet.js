import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import mainColors from '../../styles/main-colors';
import ActionSheet from 'react-native-actions-sheet';
import ActionSheetButton from './action-sheet-button';
import EditMessageModal from '../messages/edit-message-modal';

export default function ImageActionSheet({
  actionSheetRef,
  preparedActionSheetProp,
  isEditModalVisible = false,
  setEditModalVisibility,
  changeActionSheetState,
  onEditedMessageSave = () => {},
  editedMessage,
}) {
  return (
    <ActionSheet ref={actionSheetRef} overlayColor={mainColors.sand}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.text}>Select Option</Text>
        </View>
        {preparedActionSheetProp.map(({id, title, onPress}) => (
          <ActionSheetButton key={id} title={title} onPress={onPress} />
        ))}
      </View>
      <EditMessageModal
        isEditModalVisible={isEditModalVisible}
        setEditModalVisibility={setEditModalVisibility}
        changeActionSheetState={changeActionSheetState}
        onEditedMessageSave={onEditedMessageSave}
        editedMessage={editedMessage}
      />
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.lightGray,
    borderRadius: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    backgroundColor: mainColors.sand,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    color: mainColors.darkGray,
    fontSize: 20,
    margin: 10,
    fontWeight: '700',
  },
});
