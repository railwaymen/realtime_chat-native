import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InitialScreen from '../screens/initial-screen';
import LoginScreen from '../screens/login-screen';
import {defaultStackOptions} from '../stacks/headers-options';

const Stack = createStackNavigator();

export default function InitialStack() {
  return (
    <Stack.Navigator initialRouteName="InitialScreen">
      <Stack.Screen
        name="InitialScreen"
        component={InitialScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={defaultStackOptions}
      />
    </Stack.Navigator>
  );
}
