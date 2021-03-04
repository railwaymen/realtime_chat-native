import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import InitialStack from '../stacks/initial-stack';
import AuthContext from '../context/auth-context';
import UserContext from '../context/user-context';
import AuthorizedDrawer from '../stacks/authorized-drawer';
import CustomAsyncStorage from '../helpers/custom-async-storage';
import UserService from '../services/user-service';

const PrimeStack = createStackNavigator();

export default function MainStack() {
  const {isAutorizedStack, setIsAutorizedStack} = useContext(AuthContext);
  const {setLoggedUserProfile} = useContext(UserContext);

  useEffect(() => {
    sessionCreate();
  }, []);

  const sessionCreate = async () => {
    const authDetails = await CustomAsyncStorage.get();

    if (authDetails?.authenticationToken) {
      return UserService.getLoggedUserProfile().then((user) => {
        setLoggedUserProfile(user);
        setIsAutorizedStack(true);
      });
    }
  };

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
