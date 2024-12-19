import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {IMAGES} from '../../constants';
import {useRoute, useNavigation} from '@react-navigation/native';
import SearchContainer from '../../components/SearchContainer/SearchContainer';
import {Header} from '../../components/Header';
import {ROUTES} from '../../constants/routes';
import {styles} from './Styles/PropertyListingScreen';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllProperties,
  getStatesBySearch,
} from '../../redux/slice/propertySlice';

const PropertyListingScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const {locationListing} = route.params;
  const loading = useSelector(state => state.property.loading);
  const getAll = useSelector(state => state.property.propertyList);
  const hasMore = useSelector(state => state.property.hasMore);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const stateList = useSelector(state => state.property.searchedStateList);
  const statesData = useSelector(state => state.property.state);

  const loadMore = () => {
    if (!loading) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const getProperties = currentPage => {
    dispatch(
      getAllProperties({
        page: currentPage,
      }),
    );
  };

  useEffect(() => {
    getProperties(currentPage);
  }, [currentPage]);

  const renderLocationList = ({item}) => {
    const propertyDetailsPage = () => {
      navigation.navigate(ROUTES.PROPERTY_LISTING_DETAILS, {
        propertyDetails: item,
      });
    };
    return (
      <View style={styles.listItemContainer}>
        <TouchableOpacity
          style={styles.listItemChildContainer}
          activeOpacity={0.8}
          onPress={() => propertyDetailsPage()}>
          <View style={styles.imageContainer}>
            <Image
              source={
                item?.images[0]
                  ? {uri: item?.images[0]}
                  : {uri: 'https://thumbs.dreamstime.com/b/house-4431446.jpg'}
              }
              style={styles.propertyImage}
            />
          </View>
          <View style={{width: "100%"}}>
            <View style={styles.dataContainer}>
              <View>
                <Text style={styles.listItemText}>{item?.property_name}</Text>
                <Text style={styles.propertyType}>{item?.property_type}</Text>
                <Text style={styles.roomsAvailable}>
                  {item?.max_room > 1
                    ? item?.max_room + ' ' + `room's available`
                    : item?.max_room + ' ' + `room available`}
                </Text>
                <View style={styles.locationContainer}>
                  <Image source={IMAGES.Location} style={styles.locationIcon} />
                  <Text numberOfLines={1} style={styles.location}>
                    {item.details.address}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                width: 180,
                // backgroundColor: 'red',
                // flex: 1,
                alignItems:'flex-end'
              }}>
              <Text style={styles.viewAllText}>View Details</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const getSearchedCountries = searchValue => {
    dispatch(getStatesBySearch(searchValue));
  };

  useEffect(() => {
    getSearchedCountries(searchValue);
  }, [searchValue]);

  return (
    <>
      <View style={styles.container}>
        <Header
          iconName={'chevron-small-left'}
          title={'Property Listings'}
          openDrawer={() => navigation.goBack()}
        />
        <SearchContainer
          placeholderTitle={'Search Properties ...'}
          style={styles.searchContainer}
          onChangeText={text => setSearchValue(text)}
          value={searchValue}
          stateList={stateList}
        />
        {statesData ? (
          <FlatList
            data={statesData}
            renderItem={renderLocationList}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            onEndReached={hasMore === false && loadMore}
            onEndReachedThreshold={0.5}
          />
        ) : (
          <FlatList
            data={locationListing ? locationListing : getAll}
            renderItem={renderLocationList}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            onEndReached={hasMore === false && loadMore}
            onEndReachedThreshold={0.5}
          />
        )}
        {/* )} */}
      </View>
    </>
  );
};

export default PropertyListingScreen;
