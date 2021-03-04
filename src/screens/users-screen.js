import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import mainColors from '../styles/main-colors';
import UserService from '../services/user-service';
import UsersList from '../components/users/users-list';
import UserContext from '../context/user-context';
import RoomsService from '../services/rooms-service';

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

  const createOrFetchRoom = ({username, id: userId}) => {
    const newRoomDetails = {
      type: 'direct',
      users_ids: userId.toString(),
      name: username,
    };

    return RoomsService.createRoom(newRoomDetails)
      .then(redirectToExistingRoom)
      .catch(({message: {error, value}}) => {
        if (error === 'taken') {
          findExistingRoom(value);
        }
      });
  };

  const findExistingRoom = (roomName) => {
    return RoomsService.getRooms().then((fetchedRooms) => {
      const foundRoom = fetchedRooms.find(({name}) => name === roomName);
      redirectToExistingRoom(foundRoom);
    });
  };

  const redirectToExistingRoom = (room) => {
    const {name, type} = room;

    navigate('ChatStack', {
      screen: 'ChatScreen',
      params: {
        headerTitle: name,
        isEditMembersEnabled: type === 'closed',
        roomDetails: room,
      },
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <UsersList users={usersList} onPress={createOrFetchRoom} />
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
