import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../constants/routes';
import {DrawerNavigation} from './DrawerNavigation';
import SplashScreen from '../screens/Splash/SplashScreen';
import PropertyListingScreen from '../screens/PropertyListing/PropertyListingScreen';
import LoginScreen from '../screens/Authentication/Login/LoginScreen';
import SignUpScreen from '../screens/Authentication/SignUp/SignUpScreen';

const AuthNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.SIGNUP} component={SignUpScreen} />
      <Stack.Screen name={ROUTES.HOME} component={DrawerNavigation} />
      <Stack.Screen
        name={ROUTES.PROPERTY_LISTING}
        component={PropertyListingScreen}
      />
      {/* <Stack.Screen name={ROUTES.CHAT} component={ChatScreen} />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
