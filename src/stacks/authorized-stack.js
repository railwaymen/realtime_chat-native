import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AutorizedTabs from './autorized-tabs';
import {
  defaultAutorizedHeaderOptions,
  defaultTabsHeaderOptions,
} from '../stacks/headers-options';
import ChatStack from './chat-stack';

const Stack = createStackNavigator();

export default function AuthorizedStack() {
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
