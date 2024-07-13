import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, COMMOM, FONTS, IMAGES } from '../../../constants';
import SearchContainer from '../../../components/SearchContainer/SearchContainer';
import { ROUTES } from '../../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../../../config';
import { useNavigation } from '@react-navigation/native';
import { fetchUserProfile } from '../../../redux/slice/profileSlice';
import ShimmerCardItem from '../../../components/molecules/Card/ShimmerCard';

const HomeScreen = () => {
  const [propertyListings, setPropertyListings] = useState([]);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState([]);
  const userProfile = useSelector(state => state.auth.loginData)
  let userProfileData = useSelector((state) => state.profile.userProfileData);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const searchData = text => {
    const filteredList = propertyListings.filter(
      item =>
        item?.property_name.toLowerCase().includes(text.toLowerCase())
        || item?.details?.address.toLowerCase().includes(text.toLowerCase())
    );
    setSearchQuery(filteredList);
  };

  const getPropertyDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/propertyList`, {
        headers: {
          Authorization: TOKEN
        }
      })
      setPropertyListings(response.data.result)
      setSearchQuery(response.data.result);
      setLoading(false);
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getPropertyDetails()
    const subscribe = navigation.addListener('focus', () => {
      dispatch(fetchUserProfile(userProfile.id))
    })
    return subscribe;
  }, []);

  const getDetails = item => {
    navigation.navigate(ROUTES.PROPERTY_LISTING_DETAILS, {
      propertyDetails: item,
    });
  };
  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.locationContainer}
        activeOpacity={0.8}
        onPress={() => getDetails(item)}>
        {
          loading ? <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderShimmerList()};
          </ScrollView> :

            <Image source={{ uri: item?.images[0] }} style={styles.locationImage} />
        }
        <View style={styles.locationInfo}>
          <View style={styles.upperLocationInfo}>
            <View style={styles.leftLocation}>
              <Text style={styles.locationName}>{item?.property_name}</Text>
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <Image style={styles.locationIcon} source={IMAGES.Location} />
            <Text numberOfLines={1} style={styles.locationLocation}>{item?.details?.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const RouteToPropertyListing = locationData => {
    navigation.navigate(ROUTES.PROPERTY_LISTING, {
      locationListing: locationData,
    });
  };

  const renderShimmerList = () => {
    return Array(10).fill().map((_, index) => (
      <ShimmerCardItem key={index} />
    ));
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.leftContainer}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image source={IMAGES.menu} style={styles.menuIcon} />
              </TouchableOpacity>
              <View>
                {
                  userProfileData ?
                    <Text style={styles.centerNameStyle}>{'Welcome,' + ' ' + userProfileData.user.username}</Text>
                    :
                    <Text style={styles.centerNameStyle}>{'Welcome,' + ' ' + userProfile.email}</Text>
                }
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}>
              <Image
                source={userProfileData && userProfileData.user.profile ? { uri: userProfileData.user.profile } : IMAGES.ProfilePicture}
                style={styles.homeProfileImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeHeader}>
            <Text style={styles.upperText}>Explore the</Text>
            <View style={styles.bottomTextContainer}>
              <Text style={styles.beautifulText}>Beautiful </Text>
              <View style={styles.worldTextContainer}>
                <Text style={styles.worldText}>world!</Text>
                <Image
                  source={IMAGES.WelcomeBottomImage}
                  style={styles.welcomeBottomImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <SearchContainer
            placeholderTitle={'Search here..'}
            onChangeText={text => searchData(text)}
          />

          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Latest Properties</Text>
            <TouchableOpacity
              onPress={() => RouteToPropertyListing(propertyListings)}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            {
              loading ?
                <View style={{ marginLeft: -30 }}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {renderShimmerList()}
                  </ScrollView>
                </View>
                :
                searchQuery.length === 0 ? (
                  <View style={styles.locationNotFoundContainer}>
                    {/* <Image source={IMAGES.NoSearch} style={styles.noSearchImage} /> */}
                    <Text style={styles.locationNotFoundText}>
                      No Such Property is Listed
                    </Text>
                    <Text style={styles.locationNotFoundSubText}>
                      Please add relevant value
                    </Text>
                  </View>
                ) : (
                  <>

                    <View style={{ marginLeft: -30 }}>
                      <FlatList
                        data={searchQuery}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                      />
                    </View>
                  </>
                )
            }
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  mainContainer: {},
  homeProfileImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  leftContainer: {
    width: '60%',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  centerNameStyle: {
    fontSize: 18,
    color: COLORS.black,
  },
  welcomeHeader: {
    marginTop: 20,
    width: 300,
  },
  upperText: {
    fontSize: 40,
    color: COLORS.black,
    fontWeight: '300',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  beautifulText: {
    fontSize: 40,
    color: COLORS.black,
    fontWeight: '500',
  },
  worldTextContainer: {
    alignItems: 'center',
  },
  worldText: {
    color: COLORS.lightOrange,
    fontSize: 40,
  },
  welcomeBottomImage: {
    width: '100%',
    height: 11,
    marginTop: -5,
  },
  listContainer: {
    width: '100%',
    height: 450,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  loaderContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200
  },
  labelText: {
    fontSize: 28,
    color: COLORS.black,
    fontWeight: '500',
  },
  viewAllText: {
    color: COLORS.lightBlueText,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  locationImage: {
    height: 250,
    width: '100%',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  locationContainer: {
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 5,
    shadowColor: COLORS.lightTextColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    width: 200
  },
  locationInfo: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  upperLocationInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 50,
  },
  ratingsContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  locationName: {
    fontSize: 20,
    color: COLORS.mediumTextColor,
  },
  locationRatings: {
    fontSize: 15,
    color: COLORS.black,
  },
  locationIcon: {
    height: 16,
    width: 16,
  },
  lowerContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    paddingBottom: 10,
    // paddingHorizontal: 10,
  },
  locationLocation: {
    fontSize: 15,
    color: COLORS.lightTextColor,
  },
  locationNotFoundContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    marginTop: 50
  },
  locationNotFoundText: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 22,
    color: COLORS.mediumTextColor,
  },
  locationNotFoundSubText: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: 18,
    color: COLORS.lightTextColor,
  },
  noSearchImage: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  chatBotImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    backgroundColor: COLORS.transparent,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 50,
    shadowColor: COLORS.mediumTextColor,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    tintColor: COLORS.black,
  },
  starIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    tintColor: COLORS.lightOrange,
  },
});

export default HomeScreen;
