import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import mainColors from '../../styles/main-colors';
import SwipeComponent from './swipe-component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons/';

export default function RoomContainer({
  room: {item: roomDetails},
  onPress,
  removeRoom,
  redirectToRoomSettings,
}) {
  const {
    id,
    name,
    description,
    lastMessageAt,
    participants,
    type,
  } = roomDetails;

  return (
    <SwipeComponent
      onPress={() => onPress(roomDetails)}
      room={roomDetails}
      removeRoom={removeRoom}
      redirectToRoomSettings={redirectToRoomSettings}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon
            icon={faUsers}
            color={mainColors.lightGray}
            size={35}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textColumn}>
            <Text style={styles.roomName}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{lastMessageAt}</Text>
        </View>
      </View>
    </SwipeComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    backgroundColor: mainColors.darkGray,
    //flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    // zIndex: 100,
    minHeight: 60,
    padding: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.15,
  },
  textContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  textColumn: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  roomName: {
    color: mainColors.sand,
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    color: mainColors.lightGray,
  },
  dateContainer: {
    flex: 0.25,
  },
  date: {
    color: mainColors.lightGray,
    textAlign: 'right',
  },
});
