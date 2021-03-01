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
    user: {id, username, avatarUrl},
  } = message.item;

  const {
    loggedUserProfile: {id: loggedUserId},
  } = useContext(UserContext);

  const isCurrentUserMessage = id === loggedUserId;

  const messageStyles = isCurrentUserMessage
    ? {
        positionStyle: styles.rightSideMessage,
        textStyle: styles.rightSideText,
        iconColor: mainColors.lightGray,
        iconBackground: mainColors.darkGray,
        createdAtTextAlign: 'right',
      }
    : {
        positionStyle: styles.leftSideMessage,
        textStyle: styles.leftSideText,
        iconColor: mainColors.darkGray,
        iconBackground: mainColors.sand,
        createdAtTextAlign: 'left',
      };

  const {
    positionStyle,
    textStyle,
    iconColor,
    iconBackground,
    createdAtTextAlign,
  } = messageStyles;

  return (
    <View style={styles.container}>
      {!isCurrentUserMessage && (
        <Text style={[styles.date, {textAlign: createdAtTextAlign}]}>
          {username}
        </Text>
      )}
      <View style={[styles.messageContainer, shadows.container, positionStyle]}>
        <Text style={[styles.messageContainer, textStyle]}>{body}</Text>
        <View style={styles.avatar}>
          <AvatarPlaceholder
            url={avatarUrl}
            iconColor={iconColor}
            iconSize={25}
            containerStyle={{
              ...styles.iconContainerStyle,
              backgroundColor: iconBackground,
            }}
          />
        </View>
      </View>
      <Text style={[styles.date, {textAlign: createdAtTextAlign}]}>
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
    flexDirection: 'row-reverse',
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
  iconContainerStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
