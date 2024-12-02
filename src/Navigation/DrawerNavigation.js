import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ROUTES} from '../constants/routes';
import {COLORS, IMAGES} from '../constants';
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/slice/authSlice';
import HomeScreen from '../screens/Dashboard/Home/HomeScreen';
import ProfileScreen from '../screens/Dashboard/Profile/ProfileScreen';
import {styles} from './Styles/DrawerNavigationStyles';
import {getAllProperties} from '../redux/slice/propertySlice';

const SideMenuList = [
  {
    id: 0,
    option: 'Destinations',
    icon: IMAGES.HomeIcon,
    route: ROUTES.PROPERTY_LISTING,
    iconColor: COLORS.logoBackGroundColor,
  },
  {
    id: 2,
    option: 'My Profile',
    icon: IMAGES.userPlaceholder,
    route: ROUTES.EDIT_PROFILE,
    iconColor: COLORS.logoBackGroundColor2,
  },
  {
    id: 3,
    option: 'User Agreement',
    icon: IMAGES.shield,
    route: ROUTES.CHAT,
    iconColor: '#c1b8d0',
  },
  {
    id: 3,
    option: 'Help & Support',
    icon: IMAGES.Help,
    route: ROUTES.CHAT,
    iconColor: '#5991eb',
    tintColor: COLORS.white,
  },
];

const CustomDrawerContent = props => {
  let userProfileData = useSelector(state => state.profile.userProfileData);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getAll = useSelector(state => state.property.propertyList);

  const userProfile = useSelector(state => state.auth.loginData);
  const Logout = () => {
    dispatch(logout());
    navigation.navigate(ROUTES.HOME);
  };
  // console.log('userProfile', userProfile)
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.profileContainer}>
          <Image source={IMAGES.APP_ICON} style={styles.homeProfileImage} />
          <View style={styles.profileLeftContainer}>
            <Text style={styles.title}>
              {userProfileData
                ? userProfileData.user.username
                : userProfile?.username}
            </Text>
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
                    onPress={() =>
                      navigation.navigate(item.route, {
                        locationListing: getAll,
                      })
                    }>
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
                        tintColor={COLORS.appColor}
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
