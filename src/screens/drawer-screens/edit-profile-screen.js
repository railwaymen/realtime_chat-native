import React, {createRef, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import mainColors from '../../styles/main-colors';
import ImageActionSheet from '../../components/upload-images/image-action-sheet';
import imagePickerAction from '../../components/upload-images/image-picker-action';
import UsersService from '../../services/user-service';
import CustomButton from '../../shared/custom-buttom';
import UserContext from '../../context/user-context';
import BasicAuthImage from '../../shared/basic-auth-image';
import AvatarPlaceholder from '../../components/images/avatar-placeholder';

const actionSheetRef = createRef();

export default function EditProfileScreen() {
  const {
    loggedUserProfile: {avatarUrl, imageKey},
    setLoggedUserProfile,
  } = useContext(UserContext);

  const setActionSheetVisibility = () => {
    actionSheetRef.current?.setModalVisible();
  };

  const handleImagePicker = (selectedOption) => {
    return imagePickerAction(selectedOption).then(({path}) => {
      setActionSheetVisibility();
      handleUpload(path);
    });
  };

  const handleUpload = (path) => {
    return UsersService.uploadImage(path).then((res) =>
      setLoggedUserProfile(res),
    );
  };

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
        setActionSheetVisibility={setActionSheetVisibility}
        handleImagePicker={handleImagePicker}
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
