import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView} from 'react-native';
import AuthContext from '../../context/auth-context';
import UserContext from '../../context/user-context';
import mainColors from '../../styles/main-colors';
import BasicAuthImage from '../../shared/basic-auth-image';

const CustomDrawer = ({navigate}) => {
  const {logout} = useContext(AuthContext);
  const {
    loggedUserProfile: {avatarUrl, username, email},
    loggedUserProfile,
  } = useContext(UserContext);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.drawerContainer}>
        <View style={styles.content}>
          <View style={styles.userProfile}>
            <BasicAuthImage url={avatarUrl} style={styles.profileImage} />
            <View style={styles.userData}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.email}>{email}</Text>
            </View>
          </View>
          <View style={styles.navigationContainer}>
            <Button title="Home" onPress={() => navigate('AuthorizedStack')} />
            <Button
              title="Edit Profile"
              onPress={() => navigate('EditProfileStack')}
            />
            <Button title="About" onPress={() => navigate('AboutStack')} />
          </View>
        </View>
        <View style={styles.logoutContainer}>
          <Button title="Logout" onPress={logout} />
        </View>
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
    // backgroundColor: mainColors.black,
  },
  logoutContainer: {
    // backgroundColor: mainColors.darkGray,
  },
});

export default CustomDrawer;
