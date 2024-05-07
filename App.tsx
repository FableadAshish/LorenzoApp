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
function App() {
  const Stack = createStackNavigator();

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
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
