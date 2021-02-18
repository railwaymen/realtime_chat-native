import {StyleSheet} from 'react-native';
import mainColors from './main-colors';

const shadows = StyleSheet.create({
  container: {
    backgroundColor: mainColors.black,
    shadowColor: mainColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default shadows;
