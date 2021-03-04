import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import mainColors from '../../styles/main-colors';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserSlash,
  faComment,
  faCheck,
} from '@fortawesome/free-solid-svg-icons/';
import AvatarPlaceholder from '../images/avatar-placeholder';

export default function UserContainer({
  user: {username, email, avatarUrl, id},
  onPress = () => {},
  deleteEnabled = false,
  isMarkEnabled = false,
  isSingleSelection = false,
  singleSelectonId,
}) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSingleSelection) {
      setIsSelected(id === singleSelectonId);
    }
  }, [singleSelectonId]);

  const onIconPress = () => {
    if (isMarkEnabled) {
      if (isSingleSelection) {
        return onPress({id, isSelected});
      }
      const newSelectedState = onPress({id, isSelected});
      return setIsSelected(newSelectedState);
    } else if (deleteEnabled) {
      return onPress(id);
    }
    return onPress({username, id});
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: mainColors[isSelected ? 'lightGray' : 'darkGray']},
      ]}>
      <View style={styles.iconContainer}>
        <AvatarPlaceholder
          url={avatarUrl}
          iconColor={mainColors.darkGray}
          iconSize={35}
          containerStyle={styles.iconContainerStyle}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textColumn}>
          <Text
            style={[
              styles.roomName,
              isSelected && {color: mainColors.darkGray},
            ]}>
            {username}
          </Text>
          <Text
            style={[
              styles.description,
              isSelected && {color: mainColors.darkGray},
            ]}>
            {email}
          </Text>
        </View>
      </View>
      {isMarkEnabled ? (
        <TouchableOpacity
          style={[
            styles.deleteSection,
            {
              backgroundColor: isSelected
                ? mainColors.darkGreen
                : mainColors.lightGray,
            },
          ]}
          onPress={onIconPress}>
          <FontAwesomeIcon
            icon={faCheck}
            color={isSelected ? mainColors.lightGray : mainColors.darkGray}
            size={25}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.deleteSection, !deleteEnabled && styles.createSection]}
          onPress={onIconPress}>
          <FontAwesomeIcon
            icon={deleteEnabled ? faUserSlash : faComment}
            color={mainColors.lightGray}
            size={25}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 60,
    minHeight: 50,
    margin: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: mainColors.lightGray,
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  textContainer: {
    flex: 1,
  },
  textColumn: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  roomName: {
    color: mainColors.sand,
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 10,
  },
  description: {
    color: mainColors.lightGray,
  },
  iconContainerStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainColors.sand,
  },
  deleteSection: {
    backgroundColor: mainColors.darkRed,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 5,
  },
  createSection: {
    backgroundColor: mainColors.darkGreen,
  },
});
