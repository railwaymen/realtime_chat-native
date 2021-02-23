import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewGroupScreen from '../screens/new-group-screen';
import UsersScreen from '../screens/users-screen';
import MessagesScreen from '../screens/messages-screen';
import customBottomBarProp from '../helpers/custom-bottom-bar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCommentDots,
  faSearch,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons/';

const Tab = createBottomTabNavigator();

export default function AutorizedTab() {
  return (
    <Tab.Navigator
      initialRouteName="MessagesScreen"
      tabBarOptions={customBottomBarProp}>
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faSearch} color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faCommentDots} color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="NewGroupScreen"
        component={NewGroupScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faUserPlus} color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
