import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, ActivityIndicator} from 'react-native';

import mainColors from '../../styles/main-colors';
import NewRoomContext from '../../context/new-room-context';
import CustomButtom from '../../shared/custom-buttom';
import UsersList from '../../components/users/users-list';
import UserService from '../../services/user-service';
import UserContext from '../../context/user-context';

export default function RoomMembersScreen({navigation: {navigate}}) {
  const {
    loggedUserProfile: {id: currentUserId},
  } = useContext(UserContext);
  const {
    newRoom: {type, usersIds},
    assignNewRoomAttribiutes,
  } = useContext(NewRoomContext);
  const isSingleSelection = type === 'direct';

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUsersIds, setSelectedUsersIds] = useState([]);
  const [singleSelectonId, setSingleSelectionId] = useState('');

  useEffect(() => {
    UserService.getUsers().then((users) => {
      setUsers(users.filter(({id}) => id !== currentUserId));
      setIsLoading(false);
    });
  }, []);

  const selectNewUser = ({id, isSelected}) => {
    if (isSingleSelection) {
      return setSingleSelectionId(id);
    }

    setSelectedUsersIds((prevIds) =>
      isSelected
        ? prevIds.filter((prevId) => prevId !== id)
        : prevIds.concat(id),
    );

    return !isSelected;
  };

  const onConfirm = () => {
    const usersIds = isSingleSelection
      ? singleSelectonId.toString()
      : selectedUsersIds.join();

    assignNewRoomAttribiutes({usersIds});

    return navigate('SummaryScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          style={styles.loading}
          size={'large'}
          color={mainColors.sand}
        />
      ) : (
        <>
          <View style={styles.contentContainer}>
            <UsersList
              users={users}
              onPress={selectNewUser}
              isSingleSelection={isSingleSelection}
              singleSelectonId={singleSelectonId}
              isMarkEnabled
            />
          </View>
          <CustomButtom title="Confirm" onPress={onConfirm} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.darkGray,
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  contentContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  loading: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
