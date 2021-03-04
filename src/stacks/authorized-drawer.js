import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AuthorizedStack from '../stacks/authorized-stack';
import EditProfileStack from '../stacks/drawer-stacks/edit-profile-stack';
import AboutStack from '../stacks/drawer-stacks/about-stack';
import CustomDrawer from '../components/drawer/custom-drawer';
import WebSocketHook from '../hooks/web-socket-hook';

const Drawer = createDrawerNavigator();

export default function AuthorizedDrawer() {
  return (
    <WebSocketHook>
      <Drawer.Navigator
        drawerContent={({navigation: {navigate}}) => (
          <CustomDrawer navigate={navigate} />
        )}>
        <Drawer.Screen name="AuthorizedStack" component={AuthorizedStack} />
        <Drawer.Screen name="EditProfileStack" component={EditProfileStack} />
        <Drawer.Screen name="AboutStack" component={AboutStack} />
      </Drawer.Navigator>
    </WebSocketHook>
  );
}
