import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './MyTabs';
import Registarion from './RegistrationScreen';
import LoginSreen from './LogInSreen';
import { useSelector, useDispatch } from 'react-redux';
import { authStateChangeUser } from '../Redux/Auth/AuthOperations';

const MainStack = createStackNavigator();

export default function Main() {
  const dispath = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispath(authStateChangeUser());
  }, []);

  return (
    <NavigationContainer detachInactiveScreens={true}>
      {!stateChange ? (
        <MainStack.Navigator initialRouteName="Login">
          <MainStack.Screen
            name="Registration"
            component={Registarion}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Login"
            component={LoginSreen}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      ) : (
        <MainStack.Navigator initialRouteName="Home">
          <MainStack.Screen
            name="Home"
            component={MyTabs}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
}
