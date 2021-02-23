import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import mainColors from '../../styles/main-colors';

export default function ActionSheetButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.lightGray,
    borderRadius: 20,
    borderBottomWidth: 1,
    borderColor: mainColors.sand,
    marginVertical: 10,
  },
  text: {
    color: mainColors.darkGray,
    fontSize: 20,
    marginLeft: 20,
    fontWeight: '300',
    marginBottom: 5,
  },
});
