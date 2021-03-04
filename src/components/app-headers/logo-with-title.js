import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Logo from './logo';
import mainColors from '../../styles/main-colors';

export default function LogoWithTitle() {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.text}>Chat App</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: mainColors.lightGray,
    fontSize: 15,
    marginLeft: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
});
