import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../constants/routes';
import {DrawerNavigation} from './DrawerNavigation';
import SplashScreen from '../screens/Splash/SplashScreen';
import PropertyListingScreen from '../screens/PropertyListing/PropertyListingScreen';
import LoginScreen from '../screens/Authentication/Login/LoginScreen';
import SignUpScreen from '../screens/Authentication/SignUp/SignUpScreen';
import ForgetPasswordScreen from '../screens/Authentication/ForgetPassword/ForgetPasswordScreen';
import EditProfileScreen from '../screens/Dashboard/Profile/EditProfile';
import OTPScreen from '../screens/Authentication/OTP/OTPScreen';
import CreateNewPasswordScreen from '../screens/Authentication/CreateNewPassword/CreateNewPasswordScreen';
import PropertyListingDetailsScreen from '../screens/PropertyListing/PropertyListingDetailsScreen';
import VirtualTourScreen from '../screens/PropertyListing/VirtualTourScreen';

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
      <Stack.Screen
        name={ROUTES.FORGOT_PASSWORD}
        component={ForgetPasswordScreen}
      />
      <Stack.Screen name={ROUTES.HOME} component={DrawerNavigation} />
      <Stack.Screen
        name={ROUTES.PROPERTY_LISTING}
        component={PropertyListingScreen}
      />
      <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfileScreen} />
      <Stack.Screen name={ROUTES.OTP_SCREEN} component={OTPScreen} />
      <Stack.Screen
        name={ROUTES.CREATE_NEW_PASSWORD}
        component={CreateNewPasswordScreen}
      />
      <Stack.Screen
        name={ROUTES.PROPERTY_LISTING_DETAILS}
        component={PropertyListingDetailsScreen}
      />
      <Stack.Screen name={ROUTES.VIRTUAL_TOUR} component={VirtualTourScreen}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
