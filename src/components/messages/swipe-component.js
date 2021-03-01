import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  abs,
  add,
  call,
  clockRunning,
  cond,
  eq,
  not,
  set,
  useCode,
  lessThan,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  timing,
  usePanGestureHandler,
  useValue,
  snapPoint,
  useClock,
} from 'react-native-redash/lib/module/v1';
import SwipeAction from '../messages/swipe-action';
import SwipeStyles from '../../styles/swipe-styles';

const {width} = Dimensions.get('window');
const closeRoomSnapPoint = [-width, -100, 0];
const settingsSnapPoint = [width, 100, 0];
const HEIGHT = 60;
export default function SwipeComponent({
  onPress,
  removeRoom,
  redirectToRoomSettings,
  children,
  room,
  isRoomCreatedByCurrentUser,
}) {
  const [isLeftSwipe, setIsLeftSwipe] = useState(false);

  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();
  const translateX = useValue(0);
  const offsetX = useValue(0);
  const height = useValue(HEIGHT);
  const toLeft = snapPoint(translateX, velocity.x, closeRoomSnapPoint);
  const toRight = snapPoint(translateX, velocity.x, settingsSnapPoint);
  const clock = useClock();
  const shouldClose = useValue(0);
  const shouldRedirect = useValue(0);
  const deleteOpacity = useValue(1);

  useCode(
    () => [
      call([translateX], swipeDirectionHandler),
      cond(eq(state, State.ACTIVE), [
        set(translateX, add(offsetX, translation.x)),
      ]),
      cond(eq(state, State.END), [
        set(
          translateX,
          timing({
            clock,
            from: translateX,
            to: cond(lessThan(translateX, 0), toLeft, toRight),
          }),
        ),
        set(offsetX, translateX),
        cond(eq(toLeft, -width), set(shouldClose, 1)),
        cond(eq(toRight, width), set(shouldRedirect, 1)),
      ]),
      cond(shouldClose, [
        set(height, timing({from: HEIGHT, to: 0})),
        set(deleteOpacity, 0),
        cond(not(clockRunning(clock)), call([], removeRoom)),
      ]),
      cond(
        shouldRedirect,
        cond(not(clockRunning(clock)), [
          call([], redirectToRoomSettings),
          set(shouldRedirect, 0),
          set(translateX, 0),
          set(offsetX, 0),
        ]),
      ),
    ],
    [translateX, removeRoom, redirectToRoomSettings],
  );

  const swipeDirectionHandler = ([translateX]) => {
    setIsLeftSwipe(translateX <= 0);
  };

  const setActionValue = () => {
    if (isLeftSwipe) {
      return shouldClose.setValue(1);
    }
    return shouldRedirect.setValue(1);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{height}}>
        <View style={SwipeStyles.backgroundContainer(isLeftSwipe)}>
          <TouchableWithoutFeedback onPress={setActionValue}>
            <SwipeAction
              x={abs(translateX)}
              deleteOpacity={deleteOpacity}
              isLeftSwipe={isLeftSwipe}
            />
          </TouchableWithoutFeedback>
        </View>
        <PanGestureHandler
          failOffsetY={[-5, 5]}
          activeOffsetX={[-5, 5]}
          enabled={isRoomCreatedByCurrentUser}
          {...gestureHandler}>
          <Animated.View style={{transform: [{translateX}]}}>
            <TouchableWithoutFeedback onPress={() => onPress(room)}>
              {children}
            </TouchableWithoutFeedback>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
