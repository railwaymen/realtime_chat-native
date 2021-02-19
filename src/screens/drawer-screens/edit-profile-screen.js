import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import mainColors from '../../styles/main-colors';

export default function EditProfileScreen({navigation: {navigate}}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>edit profile screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.black,
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: mainColors.lightGray,
  },
});
