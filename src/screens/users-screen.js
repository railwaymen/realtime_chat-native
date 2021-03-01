import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import mainColors from '../styles/main-colors';
import UserService from '../services/user-service';
import UsersList from '../components/users/users-list';
import UserContext from '../context/user-context';

export default function UsersScreen({navigation: {navigate}}) {
  const {
    loggedUserProfile: {id: currentUserId},
  } = useContext(UserContext);

  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    UserService.getUsers().then((users) => {
      setUsersList(users.filter(({id}) => id !== currentUserId));
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <UsersList users={usersList} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.black,
    flex: 1,
    flexDirection: 'column',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
