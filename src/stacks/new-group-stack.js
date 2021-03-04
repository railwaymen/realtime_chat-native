import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditRoomScreen from '../screens/edit-room/edit-room-screen';
import RoomTypeScreen from '../screens/create-new-room/room-type-screen';
import RoomMembersScreen from '../screens/create-new-room/room-members-screen';
import SummaryScreen from '../screens/create-new-room/summary-screen';
import {defaultStackOptions} from './headers-options';
import NewRoomHook from '../hooks/new-room-hook';

const Stack = createStackNavigator();

export default function NewGroupStack() {
  return (
    <NewRoomHook>
      <Stack.Navigator>
        <Stack.Screen
          name="RoomTypeScreen"
          component={RoomTypeScreen}
          options={defaultStackOptions}
        />
        <Stack.Screen
          name="RoomNameScreen"
          component={EditRoomScreen}
          options={defaultStackOptions}
        />
        <Stack.Screen
          name="RoomMembersScreen"
          component={RoomMembersScreen}
          options={defaultStackOptions}
        />
        <Stack.Screen
          name="SummaryScreen"
          component={SummaryScreen}
          options={defaultStackOptions}
        />
      </Stack.Navigator>
    </NewRoomHook>
  );
}
