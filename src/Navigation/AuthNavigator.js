import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Dashboard/Home/HomeScreen";
import ChatScreen from "../screens/Dashboard/Chat/ChatScreen";
import ProfileScreen from "../screens/Dashboard/Profile/ProfileScreen";
import { ROUTES } from "../constants/routes";
import { DrawerNavigation } from "./DrawerNavigation";

const AuthNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name={ROUTES.HOME} component={DrawerNavigation} />
      {/* <Stack.Screen name={ROUTES.CHAT} component={ChatScreen} />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} /> */}
    </Stack.Navigator>
  )
}

export default AuthNavigator;
