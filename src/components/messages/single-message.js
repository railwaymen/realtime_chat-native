import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import UserContext from '../../context/user-context';
import mainColors from '../../styles/main-colors';
import shadows from '../../styles/shadows';
import AvatarPlaceholder from '../images/avatar-placeholder';
import MessageAttachments from '../attachments/message-attachments';
import formatDate from '../../helpers/format-date';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

const oneMinute = 60 * 1000;
const oneHour = 60 * oneMinute;

export default function SingleMessage({
  message = {},
  setActionSheetVisibility,
}) {
  const {
    body,
    createdAt,
    edited = false,
    user: {id, username, avatarUrl},
    attachments = [],
  } = message.item;

  const {
    loggedUserProfile: {id: loggedUserId},
  } = useContext(UserContext);

  const intervalValue =
    new Date() - new Date(createdAt) < oneHour ? oneMinute : oneHour;

  const [creationDate, setCreactionDate] = useState(formatDate(createdAt));

  const isCurrentUserMessage = id === loggedUserId;

  const {
    positionStyle,
    textStyle,
    iconColor,
    iconBackground,
    createdAtTextAlign,
    contentStyle,
  } = isCurrentUserMessage
    ? {
        positionStyle: styles.rightSideMessage,
        textStyle: styles.rightSideText,
        iconColor: mainColors.lightGray,
        iconBackground: mainColors.darkGray,
        createdAtTextAlign: 'right',
        contentStyle: styles.rightContent,
      }
    : {
        positionStyle: styles.leftSideMessage,
        textStyle: styles.leftSideText,
        iconColor: mainColors.darkGray,
        iconBackground: mainColors.sand,
        createdAtTextAlign: 'left',
        contentStyle: styles.leftContent,
      };

  useEffect(() => {
    let preventFromUpdate = false;

    updateCreationDate(preventFromUpdate);

    return () => {
      preventFromUpdate = true;
    };
  }, []);

  const updateCreationDate = (preventFromUpdate) => {
    setInterval(() => {
      if (!preventFromUpdate) {
        setCreactionDate(formatDate(createdAt));
      }
    }, intervalValue);
  };

  const onLongPress = () => {
    if (isCurrentUserMessage) {
      return setActionSheetVisibility({
        isMessagePressed: true,
        editedMessage: message.item,
      });
    }
  };

  return (
    <View style={styles.container}>
      {!isCurrentUserMessage && (
        <Text style={[styles.date, {textAlign: createdAtTextAlign}]}>
          {username}
        </Text>
      )}
      <Pressable
        style={[styles.messageContainer, shadows.container, positionStyle]}
        onLongPress={onLongPress}>
        <View style={contentStyle}>
          {edited && (
            <View style={styles.editIcon}>
              <FontAwesomeIcon
                icon={faEdit}
                size={12}
                color={mainColors.darkRed}
              />
            </View>
          )}
          <Text style={textStyle}>{body}</Text>
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
        <MessageAttachments
          attachments={attachments}
          iconColor={iconColor}
          iconBackground={iconBackground}
        />
      </Pressable>
      <Text style={[styles.date, {textAlign: createdAtTextAlign}]}>
        {creationDate}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  messageContainer: {
    flexDirection: 'column',
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  leftContent: {
    alignSelf: 'flex-start',
    flexDirection: 'row-reverse',
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
    alignSelf: 'center',
  },
  leftSideText: {
    color: mainColors.creamy,
    marginHorizontal: 5,
    alignSelf: 'center',
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
  editIcon: {
    backgroundColor: mainColors.lightGray,
    width: 20,
    aspectRatio: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
