import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {aboutStackOptions} from '.././headers-options';
import AboutScreen from '../../screens/drawer-screens/about-screen';

const Stack = createStackNavigator();

export default function AboutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={aboutStackOptions}
      />
    </Stack.Navigator>
  );
}
