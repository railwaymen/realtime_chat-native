import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from '../screens/chat-screen';
import EditRoomScreen from '../screens/edit-room-screen';
import {defaultChatStackOptions, chatHeader} from './headers-options';

const Stack = createStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator screenOptions={defaultChatStackOptions}>
      <Stack.Screen name="EditRoomScreen" component={EditRoomScreen} />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={chatHeader}
      />
    </Stack.Navigator>
  );
}
