import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import mainColors from '../styles/main-colors';

export default function CustomHeaderTitle({title = ''}) {
  //console.log(title);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: -10,
  },

  text: {
    color: mainColors.lightGray,
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'left',
  },
});
