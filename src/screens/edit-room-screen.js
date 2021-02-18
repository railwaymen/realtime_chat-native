import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import mainColors from '../styles/main-colors';

export default function EditRoomScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>room setting</Text>
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
    color: mainColors.creamy,
  },
});
