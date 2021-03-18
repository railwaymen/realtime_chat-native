import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import mainColors from '../../styles/main-colors';
import SwipeComponent from './swipe-component';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUsers, faUserCog} from '@fortawesome/free-solid-svg-icons/';
import UserContext from '../../context/user-context';
import WebSocketContext from '../../context/web-socket-context';
import formatDate from '../../helpers/format-date';

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
    participants = [],
    type,
    userId: createdByUserID,
  } = roomDetails;

  const {
    loggedUserProfile: {
      id: currentUserId,
      username: currentUserName,
      roomsActivity: {[`${id}`]: lastRoomActivityAt = ''} = {},
    },
  } = useContext(UserContext);
  const {unreadRoomsIdsStatus} = useContext(WebSocketContext);
  const initialUnreadMessageStatus =
    (lastRoomActivityAt &&
      lastMessageAt &&
      lastRoomActivityAt < lastMessageAt) ||
    false;

  const [isUnreadStatusActive, setIsUnreadStatusActive] = useState(
    initialUnreadMessageStatus,
  );
  const [formatedLastMessageAt, setFormatedLastMessageAt] = useState(
    formatDate(lastMessageAt),
  );

  const findOppositeMemberName = () => {
    const foundUser = participants.find(
      ({username}) => username !== currentUserName,
    );

    return foundUser?.username;
  };

  const isRoomCreatedByCurrentUser =
    createdByUserID === currentUserId && type !== 'direct';

  const roomName = type === 'direct' ? findOppositeMemberName() : name;

  useEffect(() => {
    const isNewMessageReceived = unreadRoomsIdsStatus.includes(id);

    if (!initialUnreadMessageStatus) {
      setIsUnreadStatusActive(unreadRoomsIdsStatus.includes(id));

      if (isNewMessageReceived) {
        setFormatedLastMessageAt(formatDate(Date.now()));
      }
    }
  }, [unreadRoomsIdsStatus]);

  return (
    <SwipeComponent
      onPress={() => onPress({roomDetails, isRoomCreatedByCurrentUser})}
      room={roomDetails}
      removeRoom={removeRoom}
      redirectToRoomSettings={redirectToRoomSettings}
      isRoomCreatedByCurrentUser={isRoomCreatedByCurrentUser}>
      <View
        style={[
          styles.container,
          isUnreadStatusActive && {borderColor: mainColors.darkRed},
        ]}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon
            icon={faUsers}
            color={mainColors.lightGray}
            size={35}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textColumn}>
            <Text style={styles.roomName}>{roomName}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <View style={styles.topDateContainer}>
            {lastMessageAt && (
              <Text style={styles.date}>{formatedLastMessageAt}</Text>
            )}
            {isRoomCreatedByCurrentUser && (
              <View style={styles.ownerIcon}>
                <FontAwesomeIcon
                  icon={faUserCog}
                  color={mainColors.lightGray}
                  size={12}
                />
              </View>
            )}
          </View>
          {isUnreadStatusActive && <View style={styles.unreadStatus} />}
        </View>
      </View>
    </SwipeComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.darkGray,
    flexDirection: 'row',
    borderRadius: 10,
    minHeight: 60,
    borderWidth: 1,
    borderColor: mainColors.sand,
    padding: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.15,
  },
  textContainer: {
    flex: 0.6,
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
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  topDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  date: {
    color: mainColors.lightGray,
    textAlign: 'right',
    fontSize: 12,
  },
  ownerIcon: {
    width: 20,
    aspectRatio: 1,
    backgroundColor: mainColors.darkGreen,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unreadStatus: {
    backgroundColor: mainColors.darkRed,
    width: 20,
    aspectRatio: 1,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});
