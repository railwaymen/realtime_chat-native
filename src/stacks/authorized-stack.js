import React, {useEffect, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AutorizedTabs from './autorized-tabs';
import {defaultTabsHeaderOptions} from '../stacks/headers-options';
import ChatStack from './chat-stack';
import WebSocketContext from '../context/web-socket-context';

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
    </Stack.Navigator>
  );
}
