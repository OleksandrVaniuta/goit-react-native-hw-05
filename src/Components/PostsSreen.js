import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  FlatList,
  Platform,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultScrenPosts from './NestedScreens/DefautScreenPosts';
import Maps from './NestedScreens/MapScreen';
import Comments from './NestedScreens/CommentsScreen';
import { AntDesign } from '@expo/vector-icons';
import LogOut from './SvgComponents/SvgComponentLogOut';

const NestedScreen = createStackNavigator();

export default Posts = () => {
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
            <TouchableOpacity>
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
            <TouchableOpacity>
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
            <TouchableOpacity>
              <LogOut />
            </TouchableOpacity>
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
};
