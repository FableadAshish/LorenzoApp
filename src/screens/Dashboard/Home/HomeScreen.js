import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, COMMOM, FONTS, IMAGES} from '../../../constants';
import SearchContainer from '../../../components/SearchContainer/SearchContainer';
import {ROUTES} from '../../../constants/routes';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchUserProfile} from '../../../redux/slice/profileSlice';
import ShimmerCardItem from '../../../components/molecules/Card/ShimmerCard';
import FastImage from 'react-native-fast-image';
import {getAllProperties} from '../../../redux/slice/propertySlice';
import {styles} from './Styles/HomeScreenStyles';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const getAll = useSelector(state => state.property.propertyList);
  const loading = useSelector(state => state.property.loading);

  const [searchQuery, setSearchQuery] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const userProfile = useSelector(state => state.auth.loginData);
  let userProfileData = useSelector(state => state.profile.userProfileData);
  const navigation = useNavigation();

  const getProperties = () => {
    dispatch(getAllProperties());
    const filteredList = searchQuery.filter(
      item =>
        item?.property_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item?.details?.address
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
    );
    setSearchQuery(filteredList);
  };

  useEffect(() => {
    if (searchValue) {
      const filteredList = getAll.filter(
        item =>
          item?.property_name
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item?.details?.address
            .toLowerCase()
            .includes(searchValue.toLowerCase()),
      );
      setSearchQuery(filteredList);
    } else {
      setSearchQuery(getAll);
    }
  }, [searchValue, getAll]);

  useEffect(() => {
    getProperties();
    const subscribe = navigation.addListener('focus', () => {
      dispatch(fetchUserProfile(userProfile.id));
    });
    return subscribe;
  }, []);

  const getDetails = item => {
    navigation.navigate(ROUTES.PROPERTY_LISTING_DETAILS, {
      propertyDetails: item,
    });
  };
  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.locationContainer}
        activeOpacity={0.8}
        onPress={() => getDetails(item)}>
        {loading ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderShimmerList()};
          </ScrollView>
        ) : (
          <FastImage
            style={styles.locationImage}
            source={{
              uri: item?.images[0],
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        <View style={styles.locationInfo}>
          <View style={styles.upperLocationInfo}>
            <View style={styles.leftLocation}>
              <Text style={styles.locationName}>{item?.property_name}</Text>
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <Image style={styles.locationIcon} source={IMAGES.Location} />
            <Text numberOfLines={1} style={styles.locationLocation}>
              {item?.details?.address}
            </Text>
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
    return Array(10)
      .fill()
      .map((_, index) => <ShimmerCardItem key={index} />);
  };

  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.leftContainer}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image source={IMAGES.menu} style={styles.menuIcon} />
              </TouchableOpacity>
              <View>
                {userProfileData && (
                  <Text style={styles.centerNameStyle}>
                    {'Welcome, ' +
                      userProfileData?.user?.username.split(' ')[0]}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}>
              <Image source={IMAGES.APP_ICON} style={styles.homeProfileImage} />
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeHeader}>
            <Text style={styles.upperText}>Explore our</Text>
            <View style={styles.bottomTextContainer}>
              <Text style={styles.beautifulText}>Beautiful </Text>
              <View style={styles.worldTextContainer}>
                <Text style={styles.worldText}>Venues</Text>
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
            onChangeText={text => setSearchValue(text)}
            value={searchValue}
          />

          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Latest Properties</Text>
            <TouchableOpacity onPress={() => RouteToPropertyListing(getAll)}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            {loading ? (
              <View style={{marginLeft: -30}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {renderShimmerList()}
                </ScrollView>
              </View>
            ) : searchQuery.length === 0 ? (
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
                <View style={{marginLeft: -30}}>
                  <FlatList
                    data={searchQuery}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
