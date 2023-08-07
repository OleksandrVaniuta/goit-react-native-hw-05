import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Posts from './PostsSreen';
import CreatePosts from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import LogOut from './SvgComponents/SvgComponentLogOut';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
      і
    >
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore-o" size={24} color="black" />
          ),
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
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity>
              <LogOut />
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePosts}
        options={({ navigation }) => ({
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.AddBtn}>
              <AntDesign name="plus" size={24} color="white" />
            </View>
          ),
          headerShown: true,
          tabBarStyle: {
            display: 'none',
          },
          title: 'Cтворити публікацію',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'medium',
            fontSize: 17,
          },
          headerRightContainerStyle: {
            paddingHorizontal: -10,
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  PostsBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderTopColor: '#b3b3b3',
    borderTopWidth: 1,
  },
  AddBtn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6C00',
  },
});
