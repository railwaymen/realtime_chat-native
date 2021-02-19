import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import mainColors from './src/styles/main-colors';
import MainStack from './src/stacks/main-stack';
import AuthHook from './src/hooks/auth-hook';
import UserHook from './src/hooks/user-hook';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <UserHook>
        <AuthHook>
          <MainStack />
        </AuthHook>
      </UserHook>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColors.darkGray,
    flex: 1,
  },
  body: {
    flex: 1,
  },
});

export default App;
