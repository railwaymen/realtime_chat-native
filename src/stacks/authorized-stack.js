import React, {useEffect, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AutorizedTabs from './autorized-tabs';
import {defaultTabsHeaderOptions} from '../stacks/headers-options';
import ChatStack from './chat-stack';
import NewGroupStack from '../stacks/new-group-stack';
import WebSocketContext from '../context/web-socket-context';
import NewRoomHook from '../hooks/new-room-hook';

const Stack = createStackNavigator();

export default function AuthorizedStack() {
  const {webSocket, handleWebSocket} = useContext(WebSocketContext);

  useEffect(() => {
    handleWebSocket();

    return () => {
      return webSocket.current.close();
    };
  }, []);

  return (
    <NewRoomHook>
      <Stack.Navigator>
        <Stack.Screen
          name="AutorizedTabs"
          component={AutorizedTabs}
          options={defaultTabsHeaderOptions}
        />
        <Stack.Screen
          name="ChatStack"
          component={ChatStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewGroupStack"
          component={NewGroupStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NewRoomHook>
  );
}
