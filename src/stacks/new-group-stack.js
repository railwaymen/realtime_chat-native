import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NewGroupScreen from '../screens/new-group-screen';
import {defaultStackOptions} from './headers-options';

const Stack = createStackNavigator();

export default function NewGroupStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewGroupScreen"
        component={NewGroupScreen}
        options={defaultStackOptions}
      />
    </Stack.Navigator>
  );
}
