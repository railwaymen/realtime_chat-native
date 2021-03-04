import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import CustomButtom from '../../shared/custom-buttom';
import NewRoomContext from '../../context/new-room-context';
import RoomsService from '../../services/rooms-service';

import mainColors from '../../styles/main-colors';

export default function SummaryScreen({navigation: {navigate}}) {
  const {newRoomToRequestParams} = useContext(NewRoomContext);
  const roomData = newRoomToRequestParams();

  const sendCreateRequest = () => {
    return RoomsService.createRoom(roomData)
      .then((createdRoom) => {
        navigate('ChatStack', {
          screen: 'ChatScreen',
          params: {
            headerTitle: createdRoom.name,
            isEditMembersEnabled: createdRoom.type === 'closed',
            roomDetails: createdRoom,
          },
        });
      })
      .catch(({message: {error, value}}) => {
        console.log(error, value);
        if (error.token) {
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>nn</Text>
      <CustomButtom
        title="Finish"
        onPress={sendCreateRequest}
        customContainerStyle={styles.customContainerStyle}
        customTextStyle={styles.customTextStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.sand,
    flex: 1,
    justifyContent: 'space-between',
  },
  customContainerStyle: {
    backgroundColor: mainColors.darkGray,
  },
  customTextStyle: {
    color: mainColors.lightGray,
  },
});
