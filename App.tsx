/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const HomeScreen = ({navigation}) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
        <Text>Home Screen</Text>
      </TouchableOpacity>
    );
  };

  const ProfileScreen = () => {
    return (
      <View>
        <Text>Profile Screen</Text>
      </View>
    );
  };
  return (
    <NavigationContainer>
     <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={ProfileScreen} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
