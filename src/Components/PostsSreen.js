import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultScrenPosts from './NestedScreens/DefautScreenPosts';
import Maps from './NestedScreens/MapScreen';
import Comments from './NestedScreens/CommentsScreen';
import LogOut from './SvgComponents/SvgComponentLogOut';
import { useDispatch } from 'react-redux';
import { authSingOutUser } from '../Redux/Auth/AuthOperations';

const NestedScreen = createStackNavigator();

export default Posts = () => {
  const dispath = useDispatch();

  const SignOut = () => {
    dispath(authSingOutUser());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScrenPosts"
        component={DefaultScrenPosts}
        options={{
          title: 'Публікації',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'medium',
            fontSize: 17,
          },
          headerRightContainerStyle: {
            paddingHorizontal: 10,
          },
          headerTitleStyle: {
            marginLeft: 30,
          },

          headerRight: () => (
            <TouchableOpacity onPress={SignOut}>
              <LogOut />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="MapScreen"
        component={Maps}
        options={{
          title: 'Карта',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'medium',
            fontSize: 17,
          },
          headerRightContainerStyle: {
            paddingHorizontal: 10,
          },
          headerTitleStyle: {
            marginLeft: 30,
          },
          headerRight: () => (
            <TouchableOpacity onPress={SignOut}>
              <LogOut />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        component={Comments}
        options={{
          title: 'Коментарі',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'medium',
            fontSize: 17,
          },
          headerRightContainerStyle: {
            paddingHorizontal: 10,
          },
          headerTitleStyle: {
            marginLeft: 30,
          },
          headerRight: () => (
            <TouchableOpacity onPress={SignOut}>
              <LogOut />
            </TouchableOpacity>
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
};
