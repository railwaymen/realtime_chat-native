import React from 'react';
import mainColors from '../styles/main-colors';
import BackButton from '../shared/back-button';
import DrawerButton from '../shared/drawer-button';
import CustomHeaderTitle from '../shared/custom-header-title';
import RightChatHeader from '../shared/right-chat-header';

export const defaultAutorizedHeaderOptions = {
  title: 'ChatApp',
  headerStyle: {
    backgroundColor: mainColors.darkGray,
    shadowColor: 'transparent',
  },
  headerTintColor: mainColors.lightGray,
};

export const defaultStackOptions = {
  headerTitle: 'ChatApp',
  headerStyle: {
    backgroundColor: mainColors.darkGray,
    shadowColor: 'transparent',
  },
  headerTintColor: mainColors.lightGray,
  navigationOptions: {
    headerVisible: false,
  },
  headerLeft: ({onPress}) => onPress && <BackButton onPress={onPress} />,
};

export const defaultTabsHeaderOptions = ({navigation: {openDrawer}}) => {
  return {
    headerTitle: 'ChatApp',
    headerStyle: {
      backgroundColor: mainColors.darkGray,
      shadowColor: 'transparent',
    },
    headerTintColor: mainColors.lightGray,
    navigationOptions: {
      headerVisible: false,
    },
    headerLeft: () => <DrawerButton openDrawer={openDrawer} />,
  };
};

export const aboutStackOptions = ({navigation: {goBack}}) => {
  return {
    headerStyle: {
      backgroundColor: mainColors.darkGray,
      shadowColor: 'transparent',
    },
    headerTintColor: mainColors.lightGray,
    headerLeft: () => <BackButton onPress={goBack} />,
    headerTitle: () => <CustomHeaderTitle title={'About'} />,
  };
};

export const chatHeader = ({
  navigation: {navigate, goBack},
  route: {
    params: {roomName = ''},
  },
}) => {
  return {
    headerTitle: () => <CustomHeaderTitle title={roomName} />,
    headerRight: () => <RightChatHeader navigate={navigate} />,
    headerTitleAlign: 'left',
  };
};
