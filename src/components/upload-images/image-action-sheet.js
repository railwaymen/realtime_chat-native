import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import mainColors from '../../styles/main-colors';
import ActionSheet from 'react-native-actions-sheet';
import imagePicker from './image-picker-action';
import ActionSheetButton from './action-sheet-button';

export default function ImageActionSheet({
  actionSheetRef,
  setActionSheetVisibility,
  handleImagePicker,
}) {
  const actionButtons = [
    {
      title: 'Camera',
      onPress: () => handleImagePicker('camera'),
    },
    {
      title: 'Picker',
      onPress: () => handleImagePicker('picker'),
    },
    {title: 'Cancel', onPress: setActionSheetVisibility},
  ];

  return (
    <ActionSheet ref={actionSheetRef} overlayColor={mainColors.sand}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.text}>Select Option</Text>
        </View>
        {actionButtons.map(({title, onPress}) => (
          <ActionSheetButton title={title} onPress={onPress} />
        ))}
      </View>
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
