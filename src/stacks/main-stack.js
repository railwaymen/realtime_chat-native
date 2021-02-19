import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import InitialStack from '../stacks/initial-stack';
import AuthContext from '../context/auth-context';
import AuthorizedDrawer from '../stacks/authorized-drawer';

const PrimeStack = createStackNavigator();

export default function MainStack() {
  const {isAutorizedStack} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <PrimeStack.Navigator>
        {isAutorizedStack ? (
          <PrimeStack.Screen
            name="AuthorizedDrawer"
            component={AuthorizedDrawer}
            options={{headerShown: false}}
          />
        ) : (
          <PrimeStack.Screen
            name="InitialStack"
            component={InitialStack}
            options={{headerShown: false}}
          />
        )}
      </PrimeStack.Navigator>
    </NavigationContainer>
  );
}
