import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import mainColors from '../styles/main-colors';

import RoomsService from '../services/rooms-service';
import RoomContainer from '../components/messages/room-container';

export default function HomeScreen({navigation: {navigate}}) {
  const [roomsList, setRoomsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    RoomsService.getRooms().then((fetchedRooms) => {
      setRoomsList(fetchedRooms);
      setIsLoading(false);
    });
  }, []);

  const onPress = ({roomDetails, isRoomCreatedByCurrentUser}) => {
    const {
      id: roomId,
      name: roomName,
      description,
      lastMessageAt,
      participants,
      type,
    } = roomDetails;

    const isEditMembersEnabled =
      isRoomCreatedByCurrentUser && type === 'closed';

    if (!roomId) {
      return;
    }

    console.log(isEditMembersEnabled);

    navigate('ChatStack', {
      screen: 'ChatScreen',
      params: {
        headerTitle: roomName,
        isEditMembersEnabled,
        roomDetails,
      },
    });
  };

  const removeRoom = ({item: {id}}) => {
    return RoomsService.removeRoom(id).then(() =>
      setRoomsList((prevState) => prevState.filter((room) => room.id !== id)),
    );
  };

  const redirectToRoomSettings = ({item}) => {
    const {name} = item;

    navigate('ChatStack', {
      screen: 'EditRoomScreen',
      params: {headerTitle: 'Edit Room Basics', roomDetails: item},
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <FlatList
          data={roomsList}
          renderItem={(room) => (
            <RoomContainer
              room={room}
              onPress={onPress}
              removeRoom={() => removeRoom(room)}
              redirectToRoomSettings={() => redirectToRoomSettings(room)}
            />
          )}
          keyExtractor={({id}) => id.toString()}
        />
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
