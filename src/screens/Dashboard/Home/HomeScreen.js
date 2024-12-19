import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, IMAGES} from '../../../constants';
import SearchContainer from '../../../components/SearchContainer/SearchContainer';
import {ROUTES} from '../../../constants/routes';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchUserProfile} from '../../../redux/slice/profileSlice';
import FastImage from 'react-native-fast-image';
import {
  getAllProperties,
  getCountriesBySearch,
} from '../../../redux/slice/propertySlice';
import {styles} from './Styles/HomeScreenStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.property.loading);
  const getAll = useSelector(state => state.property.propertyList);
  const hasMore = useSelector(state => state.property.hasMore);

  // console.log('hasmOtessss', hasMore);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // console.log('currentPage', currentPage)
  const userProfile = useSelector(state => state.auth.loginData);
  let userProfileData = useSelector(state => state.profile.userProfileData);
  const navigation = useNavigation();
  // const [countriesList, setCountriesList] = useState([]);
  const countriesList = useSelector(state => state.property.searchedList);
  const countriesData = useSelector(state => state.property.countries);

  const getProperties = currentPage => {
    dispatch(
      getAllProperties({
        page: currentPage,
      }),
    );
  };

  const getSearchedCountries = searchValue => {
    dispatch(getCountriesBySearch(searchValue));
  };

  useEffect(() => {
    getSearchedCountries(searchValue);
  }, [searchValue]);

  useEffect(() => {
    getProperties(currentPage);
    dispatch(fetchUserProfile(userProfile.id));
  }, [currentPage]);

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
        <FastImage
          style={styles.locationImage}
          // source={{
          //   uri: item?.images[0],
          //   priority: FastImage.priority.high,
          // }}
          source={item?.images[0] ? {uri: item?.images[0]} : {uri: 'https://thumbs.dreamstime.com/b/house-4431446.jpg'}}

          resizeMode={FastImage.resizeMode.contain}
        />
        {/* )} */}
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

  const loadMore = () => {
    if (!loading) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const renderCountrySection = countryData => {
    return (
      <View key={countryData.country}>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{countryData.country} Properties</Text>
          <TouchableOpacity
            onPress={() => RouteToPropertyListing(countryData.searchedData)}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: -30}}>
          <FlatList
            data={countryData.searchedData}
            keyExtractor={(item, index) => `${countryData.country}-${index}`}
            renderItem={renderList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  };

  const RouteToPropertyListing = locationData => {
    const isList = locationData ? locationData : '';
    navigation.navigate(ROUTES.PROPERTY_LISTING, {
      locationListing: isList,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={IMAGES.menu} style={styles.menuIcon} />
            </TouchableOpacity>
            <View>
              {userProfileData && (
                <Text style={styles.centerNameStyle}>
                  {'Welcome, ' + userProfileData?.user?.username.split(' ')[0]}
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
          countriesList={countriesList}
        />

        <View style={styles.listContainer}>
          <ScrollView
            style={{backgroundColor: COLORS.bgColor}}
            showsVerticalScrollIndicator={false}>
            <>
              {countriesData && countriesData.length > 0 ? (
                countriesData.map(renderCountrySection)
              ) : (
                <>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Latest Properties</Text>
                    <TouchableOpacity onPress={() => RouteToPropertyListing()}>
                      <Text style={styles.viewAllText}>View all</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginLeft: -30}}>
                    <FlatList
                      data={getAll}
                      keyExtractor={item => item.id}
                      renderItem={renderList}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      onEndReached={hasMore === false && loadMore}
                      onEndReachedThreshold={0.5}
                    />
                  </View>
                </>
              )}
            </>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
