import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {
  divide,
  interpolate,
  Extrapolate,
  sub,
  cond,
  add,
  lessThan,
} from 'react-native-reanimated';
import mainColors from '../../styles/main-colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons/';
import SwipeStyles from '../../styles/swipe-styles';

const HEIGHT = 60;

const SwipeAction = ({x, deleteOpacity, isLeftSwipe}) => {
  const details = isLeftSwipe
    ? {
        backgroundColor: mainColors.darkRed,
        icon: faTimes,
        color: mainColors.grey,
        actionName: 'Close',
      }
    : {
        backgroundColor: mainColors.lightGray,
        icon: faEdit,
        color: mainColors.darkGray,
        actionName: 'Edit',
      };
  const {backgroundColor, icon, color, actionName} = details;

  const size = cond(lessThan(x, HEIGHT), x, add(x, sub(x, HEIGHT)));
  const translateX = cond(
    lessThan(x, HEIGHT),
    0,
    divide(sub(x, HEIGHT), isLeftSwipe ? 2 : -2),
  );
  const scale = interpolate(size, {
    inputRange: [20, 30],
    outputRange: [0.01, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const iconOpacity = interpolate(size, {
    inputRange: [HEIGHT - 10, HEIGHT + 10],
    outputRange: [1, 0],
  });
  const textOpacity = sub(1, iconOpacity);

  return (
    <Animated.View
      style={SwipeStyles.actionContainer({backgroundColor, size, translateX})}>
      <Animated.View
        style={{
          opacity: iconOpacity,
          transform: [{scale}],
        }}>
        <FontAwesomeIcon icon={icon} color={color} size={20} />
      </Animated.View>
      <Animated.View
        style={SwipeStyles.contentOpacity({textOpacity, deleteOpacity})}>
        <Text style={SwipeStyles.actionText(color)}>{actionName}</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default SwipeAction;
