import {StyleSheet} from 'react-native';
import {multiply, divide} from 'react-native-reanimated';

export default class SwipeStyles {
  static backgroundContainer = (isLeftSwipe) => ({
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: isLeftSwipe ? 'flex-end' : 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  });
  static contentOpacity = ({textOpacity, deleteOpacity}) => ({
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: multiply(textOpacity, deleteOpacity),
  });
  static actionContainer = ({backgroundColor, size, translateX}) => ({
    backgroundColor,
    borderRadius: divide(size, 2),
    justifyContent: 'center',
    alignItems: 'center',
    height: size,
    aspectRatio: 1,
    transform: [{translateX}],
  });
  static actionText = (color) => ({
    color,
    fontSize: 16,
    fontWeight: '600',
  });
}
