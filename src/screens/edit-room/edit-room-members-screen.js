import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import mainColors from '../../styles/main-colors';
import RoomMembersService from '../../services/room-members-service';
import UserService from '../../services/user-service';
import RoomsService from '../../services/rooms-service';
import UserContainer from '../../components/users/user-container';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/';
import UsersListModal from '../../components/users/users-list-modal';
import UserContext from '../../context/user-context';

export default function EditRoomMembersScreen({
  route: {
    params: {
      roomDetails: {id: roomId, name, description},
    },
  },
}) {
  const {
    loggedUserProfile: {id: currentUserId},
  } = useContext(UserContext);

  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUsersIds, setSelectedUsersIds] = useState([]);

  useEffect(() => {
    loadMembers();
    loadUsers();
  }, []);

  const loadMembers = () => {
    return RoomMembersService.getMembers(roomId).then((fetchedMembers) => {
      setMembers(fetchedMembers.filter(({user: {id}}) => id !== currentUserId));
    });
  };

  const loadUsers = () => {
    UserService.getUsers().then((users) =>
      setUsers(users.filter(({id}) => id !== currentUserId)),
    );
  };

  const removeMember = (idToRemove) => {
    return RoomMembersService.removeMember(idToRemove).then(() =>
      setMembers((prevState) => prevState.filter(({id}) => id !== idToRemove)),
    );
  };

  const selectNewUser = ({id, isSelected}) => {
    setSelectedUsersIds((prevIds) =>
      isSelected ? prevIds.filter((prevId) => prevId !== id) : [...prevIds, id],
    );

    return !isSelected;
  };

  const onSave = () => {
    const currentMembersIds = members.map(({user: {id: memberId}}) => memberId);

    const userIds = [
      ...new Set(currentMembersIds.concat(selectedUsersIds)),
    ].join();

    return RoomsService.updateRoom({
      roomId,
      name,
      description,
      userIds,
    }).then(async () => {
      await loadMembers();
      setIsModalVisible(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={members}
          renderItem={({item: {user, id}}) => (
            <UserContainer
              key={id.toString()}
              user={user}
              onPress={() => removeMember(id)}
              deleteEnabled
            />
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.addContainer}
        onPress={() => setIsModalVisible(true)}>
        <FontAwesomeIcon icon={faPlus} color={mainColors.lightGray} size={40} />
      </TouchableOpacity>
      <UsersListModal
        users={users}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectNewUser={selectNewUser}
        onSave={onSave}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.darkGray,
    flex: 1,
    paddingVertical: 20,
  },
  listContainer: {
    flex: 1,
    zIndex: -10,
  },
  addContainer: {
    backgroundColor: mainColors.sand,
    width: 80,
    aspectRatio: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
    zIndex: 10,
  },
});
