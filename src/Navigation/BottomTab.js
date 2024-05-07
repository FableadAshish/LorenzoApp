import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ROUTES } from "../constants/routes";
import HomeScreen from "../screens/Dashboard/Home/HomeScreen";
import ChatScreen from "../screens/Dashboard/Chat/ChatScreen";
import ProfileScreen from "../screens/Dashboard/Profile/ProfileScreen";
import { COLORS, IMAGES } from "../constants";
import { Image } from "react-native";
import PropertyListingScreen from "../screens/PropertyListing/PropertyListingScreen";

const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  const getTabBarIcon = (route, color, focused) => {
    let iconName;
    let colors = color;
    if (route.name === ROUTES.HOME) {
      if (focused) {
        return (
          <Image
            source={IMAGES.HomeIcon}
            style={{ width: 28, height: 28 }}
            tintColor={COLORS.lightPrimaryColor}
            resizeMode="contain"
          />
        );
      } else {
        return (
          <Image
            source={IMAGES.HomeIcon}
            style={{ width: 28, height: 28 }}
            tintColor={COLORS.lightTextColor}
          />
        );
      }
    } else if (route.name === ROUTES.CHAT) {
      if (focused) {
        return (
          <Image
            source={IMAGES.ChatIcon}
            style={{ width: 28, height: 28 }}
            tintColor={COLORS.lightPrimaryColor}
            resizeMode="contain"
          />
        );
      } else {
        return (
          <Image
            source={IMAGES.ChatIcon}
            style={{ width: 28, height: 28 }}
            tintColor={COLORS.lightTextColor}
          />
        );
      }
    } else if (route.name === ROUTES.PROFILE) {
      if (focused) {
        return (
          <Image
            source={IMAGES.ProfileIcon}
            style={{ width: 28, height: 28 }}
            tintColor={COLORS.lightPrimaryColor}
            resizeMode="contain"
          />
        );
      } else {
        return (
          <Image
            source={IMAGES.ProfileIcon}
            style={{ width: 28, height: 28 }}
            tintColor={COLORS.lightTextColor}
          />
        );
      }
    } else if (route.name === ROUTES.PROPERTY_LISTING) {
      if (focused) {
        return (
          <Image
            source={IMAGES.CalendarIcon}
            style={{ width: 28, height: 28 }}
            tintColor={COLORS.lightPrimaryColor}
            resizeMode="contain"
          />
        );
      } else {
        return (
          <Image
            source={IMAGES.CalendarIcon}
            style={{ width: 28, height: 28 }}
            tintColor={COLORS.lightTextColor}
          />
        );
      }
    } else if (route.name === ROUTES.SCANNER) {
      iconName = focused ? 'qr-code' : 'qr-code-outline';
      colors = focused ? COLORS.primaryTab : COLORS.primaryTabGray;
    }
    // return <Image name={iconName} size={25} color={colors} />
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused }) => getTabBarIcon(route, color, focused),
        tabBarLabelStyle:{fontSize: 15}
      })}
    >
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.CHAT} component={ChatScreen} />
      <Tab.Screen name={ROUTES.PROPERTY_LISTING} component={PropertyListingScreen} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      {/* <Tab.Screen name={ROUTES.HOME} component={HomeScreen} /> */}
    </Tab.Navigator>
  )
}

export default BottomTab;
