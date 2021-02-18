import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import UserContext from '../../context/user-context';
import mainColors from '../../styles/main-colors';
import shadows from '../../styles/shadows';
import BasicAuth from '../../helpers/basic-auth';

export default function AvatarPlaceholder({url = ''}) {
  //console.log(url);
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: url,
          headers: BasicAuth(),
        }}
      />
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
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
