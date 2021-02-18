import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import mainColors from '../styles/main-colors';

export default function DrawerButton({openDrawer}) {
  const onPress = () => {
    openDrawer();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FontAwesomeIcon size={20} style={styles.icon} icon={faBars} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
  },
  icon: {
    color: mainColors.sand,
  },
});
