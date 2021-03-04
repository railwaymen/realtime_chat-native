import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import logoImage from '../../../assets/images/logo.png';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logo: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
});
