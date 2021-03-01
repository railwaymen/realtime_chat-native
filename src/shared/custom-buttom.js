import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import mainColors from '../styles/main-colors';

export default function CustomButtom({title = '', onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.sand,
    flexDirection: 'row',
    flex: 0.8,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    maxHeight: 40,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  text: {
    color: mainColors.darkGray,
    textAlign: 'center',
    fontSize: 20,
  },
});
