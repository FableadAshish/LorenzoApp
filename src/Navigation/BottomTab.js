import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ROUTES} from '../constants/routes';
import HomeScreen from '../screens/Dashboard/Home/HomeScreen';
import ChatScreen from '../screens/Dashboard/Chat/ChatScreen';
import ProfileScreen from '../screens/Dashboard/Profile/ProfileScreen';
import {COLORS, IMAGES} from '../constants';
import {Image} from 'react-native';
import PropertyListingScreen from '../screens/PropertyListing/PropertyListingScreen';
import {View, StyleSheet} from 'react-native';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  const getTabBarIcon = (route, color, focused) => {
    let iconName;
    let colors = color;
    if (route.name === ROUTES.HOME) {
      if (focused) {
        return (
          <View style={styles.iconContainer}>
            <Image
              source={IMAGES.HomeIcon}
              style={{width: 28, height: 28}}
              tintColor={'#E6E3DF'}
              resizeMode="contain"
            />
          </View>
        );
      } else {
        return (
          <Image
            source={IMAGES.HomeIcon}
            style={{width: 28, height: 28}}
            tintColor={COLORS.lightTextColor}
          />
        );
      }
    } else if (route.name === ROUTES.CHAT) {
      if (focused) {
        return (
          <View style={styles.iconContainer}>
            <Image
              source={IMAGES.ChatIcon}
              style={{width: 28, height: 28}}
              tintColor={'#E6E3DF'}
              resizeMode="contain"
            />
          </View>
        );
      } else {
        return (
          <Image
            source={IMAGES.ChatIcon}
            style={{width: 28, height: 28}}
            tintColor={COLORS.lightTextColor}
          />
        );
      }
    } else if (route.name === ROUTES.PROFILE) {
      if (focused) {
        return (
          <View style={styles.iconContainer}>
            <Image
              source={IMAGES.ProfileIcon}
              style={{width: 28, height: 28}}
              tintColor={'#E6E3DF'}
              resizeMode="contain"
            />
          </View>
        );
      } else {
        return (
          <Image
            source={IMAGES.ProfileIcon}
            style={{width: 28, height: 28}}
            tintColor={COLORS.lightTextColor}
          />
        );
      }
    } else if (route.name === ROUTES.PROPERTY_LISTING) {
      if (focused) {
        return (
          <Image
            source={IMAGES.CalendarIcon}
            style={{width: 28, height: 28}}
            tintColor={COLORS.lightPrimaryColor}
            resizeMode="contain"
          />
        );
      } else {
        return (
          <Image
            source={IMAGES.CalendarIcon}
            style={{width: 28, height: 28}}
            tintColor={COLORS.lightTextColor}
          />
        );
      }
    } else if (route.name === ROUTES.SCANNER) {
      iconName = focused ? 'qr-code' : 'qr-code-outline';
      colors = focused ? COLORS.primaryTab : COLORS.primaryTabGray;
    }
  };
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: '',
        headerShown: false,
        tabBarIcon: ({color, focused}) => getTabBarIcon(route, color, focused),
        tabBarStyle: {
          borderTopColor: COLORS.white,
          paddingTop: 0 /*backgroundColor: '#E6E3DF'*/,
        },
        // tabBarLabelStyle: {fontSize: 15},
      })}>
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      {/* <Tab.Screen name={ROUTES.CHAT} component={ChatScreen} /> */}
      {/* <Tab.Screen
        name={ROUTES.PROPERTY_LISTING}
        component={PropertyListingScreen}
      /> */}
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
      {/* <Tab.Screen name={ROUTES.HOME} component={HomeScreen} /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: -20,
    backgroundColor: 'black',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default BottomTab;
