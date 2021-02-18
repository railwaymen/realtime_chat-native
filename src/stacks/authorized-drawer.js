import React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AuthorizedStack from '../stacks/authorized-stack';
import AboutStack from '../stacks/drawer-stacks/about-stack';

const Drawer = createDrawerNavigator();

export default function AuthorizedDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="AuthorizedStack" component={AuthorizedStack} />
      <Drawer.Screen name="About" component={AboutStack} />
    </Drawer.Navigator>
  );
}
