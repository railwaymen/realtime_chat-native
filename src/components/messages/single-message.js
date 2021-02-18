import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import UserContext from '../../context/user-context';
import mainColors from '../../styles/main-colors';
import shadows from '../../styles/shadows';
import AvatarPlaceholder from '../images/avatar-placeholder';

export default function SingleMessage({message = {}}) {
  const {
    body,
    createdAt,
    user: {id, avatarUrl},
  } = message.item;

  const {
    loggedUserProfile: {id: loggedUserId},
  } = useContext(UserContext);

  const isCurrentUserMessage = id === loggedUserId;

  return (
    <View style={styles.container}>
      {isCurrentUserMessage ? (
        <View
          style={[
            styles.messageContainer,
            shadows.container,
            styles.rightSideMessage,
          ]}>
          <Text style={[styles.messageContainer, styles.rightSideText]}>
            {body}
          </Text>
          <View style={styles.avatar}>
            <AvatarPlaceholder url={avatarUrl} />
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.messageContainer,
            shadows.container,
            styles.leftSideMessage,
          ]}>
          <View style={styles.avatar}>
            <AvatarPlaceholder url={avatarUrl} />
          </View>
          <Text style={[styles.messageContainer, styles.leftSideText]}>
            {body}
          </Text>
        </View>
      )}
      <Text
        style={[
          styles.date,
          {textAlign: isCurrentUserMessage ? 'right' : 'left'},
        ]}>
        {createdAt}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  leftSideMessage: {
    backgroundColor: mainColors.darkGray,
    alignSelf: 'flex-start',
  },
  rightSideMessage: {
    backgroundColor: mainColors.sand,
    alignSelf: 'flex-end',
  },
  rightSideText: {
    color: mainColors.darkGray,
    marginHorizontal: 5,
  },
  leftSideText: {
    color: mainColors.creamy,
    marginHorizontal: 5,
  },
  date: {
    fontSize: 11,
    color: mainColors.darkGray,
    marginHorizontal: 5,
  },
  avatar: {
    alignSelf: 'flex-start',
  },
});
