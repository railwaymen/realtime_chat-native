import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import BasicAuthImage from '../../shared/basic-auth-image';

export default function AvatarPlaceholder({url = ''}) {
  return (
    <View style={styles.container}>
      <BasicAuthImage url={url} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column',
    // marginVertical: 10,
    //  marginHorizontal: 10,
    //  width: 50,
    //  height: 50,
    // borderRadius: 25,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
