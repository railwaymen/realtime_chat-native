import React, {createRef, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import mainColors from '../../styles/main-colors';
import ImageActionSheet from '../../components/upload-images/image-action-sheet';
import imagePickerAction from '../../components/upload-images/image-picker-action';
import UsersService from '../../services/user-service';
import CustomButton from '../../shared/custom-buttom';
import UserContext from '../../context/user-context';
import AvatarPlaceholder from '../../components/images/avatar-placeholder';
import actionSheetButtonsProp from '../../helpers/action-sheet-buttons-prop';

const actionSheetRef = createRef();

export default function EditProfileScreen() {
  const {
    loggedUserProfile: {avatarUrl, imageKey},
    setLoggedUserProfile,
  } = useContext(UserContext);

  const setActionSheetVisibility = () => {
    actionSheetRef.current?.setModalVisible();
  };

  const handleImagePicker = async (selectedOption) => {
    const {path} = await imagePickerAction(selectedOption);

    setActionSheetVisibility();

    return UsersService.uploadImage(path)
      .then((res) => {
        console.log(res);
        return setLoggedUserProfile(res);
      })
      .catch(console.log);
  };

  const actionSheetProp = actionSheetButtonsProp({
    onPressFirstOption: () => handleImagePicker('camera'),
    onPressSecondOption: () => handleImagePicker('picker'),
    setActionSheetVisibility,
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <AvatarPlaceholder
            url={avatarUrl}
            iconColor={mainColors.darkGray}
            iconSize={60}
            containerStyle={styles.iconContainerStyle}
            imageKey={imageKey}
          />
        </View>
        <CustomButton title="Upload Image" onPress={setActionSheetVisibility} />
      </View>
      <ImageActionSheet
        actionSheetRef={actionSheetRef}
        preparedActionSheetProp={actionSheetProp}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.black,
    flex: 1,
  },
  contentContainer: {
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: mainColors.lightGray,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  iconContainerStyle: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainColors.lightGray,
  },
});
