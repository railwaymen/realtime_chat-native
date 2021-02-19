import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {aboutStackOptions} from '.././headers-options';
import EditProfileScreen from '../../screens/drawer-screens/edit-profile-screen';

const Stack = createStackNavigator();

export default function EditProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={aboutStackOptions}
      />
    </Stack.Navigator>
  );
}
