import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { ROUTES } from "../constants/routes";
import HomeScreen from "../screens/Dashboard/Home/HomeScreen";
import ChatScreen from "../screens/Dashboard/Chat/ChatScreen";
import BottomTab from "./BottomTab";
export const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  return(
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name={ROUTES.HOME} component={BottomTab} />
      <Drawer.Screen name={ROUTES.CHAT} component={ChatScreen} />
    </Drawer.Navigator>
  )
}