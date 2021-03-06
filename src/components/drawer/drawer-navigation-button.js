import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import mainColors from '../../styles/main-colors';

export default function DrawerNavigationButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginVertical: 10,
    //  marginHorizontal: 10,

    // borderRadius: 25,
    backgroundColor: mainColors.lightGray,
    //flex: 6,
    width: '70%',
    alignSelf: 'center',

    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 5,
    marginVertical: 10,
  },
  text: {
    color: mainColors.darkGray,
    // textAlign: 'center',
    fontSize: 20,
  },
});
