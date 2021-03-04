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

export default function UserContainer({name, onPress, value, selectedType}) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selectedType === value);
  }, [selectedType]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: mainColors[isSelected ? 'sand' : 'lightGray']},
      ]}
      onPress={onPress}>
      <View style={styles.iconContainer}>
        {/* <AvatarPlaceholder
          url={avatarUrl}
          iconColor={mainColors.darkGray}
          iconSize={35}
          containerStyle={styles.iconContainerStyle}
        /> */}
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textColumn}>
          <Text
            style={[
              styles.roomName,
              isSelected && {color: mainColors.darkGray},
            ]}>
            {name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 60,
    maxHeight: 80,
    margin: 10,
    paddingHorizontal: 5,
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
});
