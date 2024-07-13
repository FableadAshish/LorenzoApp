import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ROUTES} from '../constants/routes';
import BottomTab from './BottomTab';
import ChatScreen from '../screens/Dashboard/Chat/ChatScreen';
import {COLORS, COMMOM, IMAGES} from '../constants';
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slice/authSlice';
import HomeScreen from '../screens/Dashboard/Home/HomeScreen';
import ProfileScreen from '../screens/Dashboard/Profile/ProfileScreen';
import PropertyListingScreen from '../screens/PropertyListing/PropertyListingScreen';

const SideMenuList = [
  {
    id: 0,
    option: 'Home',
    icon: IMAGES.HomeIcon,
    route: ROUTES.HOME,
    iconColor: '#7888F1',
  },
  {
    id: 2,
    option: 'Profile',
    icon: IMAGES.userPlaceholder,
    route: ROUTES.EDIT_PROFILE,
    iconColor: '#A18FF4',
  },
  {
    id: 3,
    option: 'Legal & Policies',
    icon: IMAGES.shield,
    route: ROUTES.CHAT,
    iconColor: '#f5bd7f',
  },
  {
    id: 3,
    option: 'Help & Support',
    icon: IMAGES.Help,
    route: ROUTES.CHAT,
    iconColor: '#5991eb',
    tintColor: COLORS.white
  },
  // {
  //   id: 4,
  //   option: 'Location',
  //   icon: IMAGES.chatPlain,
  //   route: ROUTES.CHAT,
  //   iconColor: '#FA93C5',
  // },
  // {
  //   id: 5,
  //   option: 'User',
  //   icon: IMAGES.userPlaceholder,
  //   route: ROUTES.CHAT,
  //   iconColor: '#5BCFEE',
  // },
];

const CustomDrawerContent = props => {
  const navigation = useNavigation();
const dispatch = useDispatch();
  const userProfile = useSelector(state => state.auth.loginData)
  const Logout = () => {
    dispatch(logout());
    navigation.navigate(ROUTES.HOME)
  }
  // console.log('userProfile', userProfile)
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMOrymTDNXsz8-GyS-KfKuJzZ7R5_JWbTzOPsxNM-yyA&s',
            }}
            style={styles.homeProfileImage}
          />
          <View style={styles.profileLeftContainer}>
            <Text style={styles.title}>{userProfile?.username}</Text>
            <Text style={styles.subTitle}>{userProfile?.email}</Text>
          </View>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            bounces={false}
            data={SideMenuList}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              const currentRouteName = getFocusedRouteNameFromRoute(
                navigation.getState().routes[
                  navigation.getState().routes.length - 1
                ],
              );
              const isActiveScreen = currentRouteName === item.route;

              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    width: '100%',
                    marginLeft: 15,
                  }}>
                  <TouchableOpacity
                    style={[
                      styles.listView,
                      isActiveScreen && {
                        backgroundColor: COLORS.lightBlueText,
                        borderRadius: 15,
                      },
                    ]}
                    onPress={() => navigation.navigate(item.route)}>
                    <View style={styles.drawerList}>
                      <View
                        style={[
                          styles.imageContainer,
                          !isActiveScreen
                            ? {backgroundColor: item.iconColor}
                            : '',
                        ]}>
                        <Image
                          source={item.icon}
                          style={styles.listImgStyle}
                          tintColor={
                            isActiveScreen
                              ? COLORS.white
                              : COLORS.mediumTextColor
                          }
                        />
                      </View>
                      <Text
                        style={[
                          styles.listTxtStyle,
                          isActiveScreen && {color: COLORS.white},
                        ]}>
                        {item.option}
                      </Text>
                    </View>
                    <View style={{marginLeft: -20}}>
                      {/* <Icon
                        name="chevron-thin-right"
                        size={18}
                        color={!isActiveScreen ? COLORS.black : COLORS.white}
                      /> */}
                      <Image
                        source={IMAGES.rightArrow}
                        style={styles.rightIcon}
                        tintColor={COLORS.black}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View>
        <Button
          title={'Sign Out'}
          style={styles.drawerButton}
          // innerStyle={styles.drawerButtonInnerStyle}
          performAction={Logout}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  drawerHeader: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerHeaderText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: 15,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    gap: 10,
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 8,
    height: 60,
  },
  listImgStyle: {
    height: 22,
    width: 22,
  },
  listTxtStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.black,
    marginLeft: -2,
    letterSpacing: 0.6,
  },
  homeProfileImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.mediumTextColor,
    marginLeft: 10,
    letterSpacing: 0.6,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.lightTextColor,
    marginLeft: 10,
    letterSpacing: 0.6,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    padding: 20,
    width: '100%',
  },
  profileLeftContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerButton: {
    paddingHorizontal: COMMOM.paddingHorizantal,
    paddingBottom: COMMOM.paddingHorizantal,
  },
  drawerButtonInnerStyle: {
    borderRadius: 50,
    backgroundColor: COLORS.lightPrimaryColor,
    height: 50,
  },
  imageContainer: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 10,
  },
  rightIcon: {
    height: 16,
    width: 16,
    tintColor: COLORS.black,
    resizeMode: 'contain',
  },
  drawerList: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    gap: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: '80%'},
        // drawerStatusBarAnimation: COLORS.placeholderColor,
      }}>
      <Drawer.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Drawer.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
    </Drawer.Navigator>
  );
};
