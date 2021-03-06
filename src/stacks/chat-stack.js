import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from '../screens/chat-screen';
import EditRoomScreen from '../screens/edit-room/edit-room-screen';
import EditRoomMembersScreen from '../screens/edit-room/edit-room-members-screen';
import SearchMessagesScreen from '../screens/search-messages-screen';
import {
  defaultChatStackOptions,
  chatHeader,
  editMembersHeader,
} from './headers-options';

const Stack = createStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator screenOptions={defaultChatStackOptions}>
      <Stack.Screen name="EditRoomScreen" component={EditRoomScreen} />
      <Stack.Screen
        name="EditRoomMembersScreen"
        component={EditRoomMembersScreen}
        options={editMembersHeader}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={chatHeader}
      />
      <Stack.Screen
        name="SearchMessagesScreen"
        component={SearchMessagesScreen}
        options={editMembersHeader}
      />
    </Stack.Navigator>
  );
}
