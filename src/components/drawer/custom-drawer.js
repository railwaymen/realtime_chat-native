import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

import AuthContext from '../../context/auth-context';
import UserContext from '../../context/user-context';
import mainColors from '../../styles/main-colors';
import DrawerNavigationButton from '../drawer/drawer-navigation-button';
import UserModel from '../../models/user-model';
import AvatarPlaceholder from '../images/avatar-placeholder';

const CustomDrawer = ({navigate, route}) => {
  const {logout} = useContext(AuthContext);
  const {loggedUserProfile} = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(new UserModel({}));
  const {username, email, avatarUrl, imageKey} = userProfile;

  useEffect(() => {
    setUserProfile(loggedUserProfile);
  }, []);

  useEffect(() => {
    setUserProfile(loggedUserProfile);
  }, [loggedUserProfile]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.drawerContainer}>
        <View style={styles.content}>
          <View style={styles.userProfile}>
            {avatarUrl && (
              <AvatarPlaceholder
                url={avatarUrl}
                iconColor={mainColors.darkGray}
                iconSize={60}
                containerStyle={styles.iconContainerStyle}
                imageKey={imageKey}
              />
            )}
            <View style={styles.userData}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.email}>{email}</Text>
            </View>
          </View>
          <View style={styles.navigationContainer}>
            <DrawerNavigationButton
              title="Home"
              onPress={() => navigate('AuthorizedStack')}
            />
            <DrawerNavigationButton
              title="Edit Profile"
              onPress={() => navigate('EditProfileStack')}
            />
            <DrawerNavigationButton
              title="About"
              onPress={() => navigate('AboutStack')}
            />
          </View>
        </View>
        <DrawerNavigationButton title="Logout" onPress={logout} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: mainColors.darkGray,
    borderColor: mainColors.sand,
    borderRightWidth: 1,
  },
  drawerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {},
  userProfile: {
    padding: 10,
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userData: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
  },
  username: {
    fontSize: 20,
    color: mainColors.creamy,
    paddingVertical: 10,
  },
  email: {
    fontSize: 12,
    color: mainColors.lightGray,
  },
  navigationContainer: {
    marginTop: 20,
  },
  iconContainerStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainColors.sand,
  },
});

export default CustomDrawer;
