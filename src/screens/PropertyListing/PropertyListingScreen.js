import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS, COMMOM, FONTS, IMAGES } from '../../constants';
import { useRoute, useNavigation } from '@react-navigation/native';
import SearchContainer from '../../components/SearchContainer/SearchContainer';
import { Header } from '../../components/Header';
import { ROUTES } from '../../constants/routes';

const PropertyListingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { locationListing } = route.params;
  const [searchingList, setSearchingList] = useState(locationListing);

  const renderLocationList = ({ item }) => {
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
            <Image source={{ uri: item?.images[0] }} style={styles.propertyImage} />
          </View>
          <View style={styles.dataContainer}>
            <View>
              <Text style={styles.listItemText}>{item?.property_name}</Text>
              <Text style={styles.propertyType}>{item?.property_type}</Text>
              <Text style={styles.roomsAvailable}>
                {item?.max_room > 1 ? (item?.max_room + ' ' + `room's available`) : (item?.max_room + ' ' + `room available`)}
              </Text>
              <View style={styles.locationContainer}>
                <Image source={IMAGES.Location} style={styles.locationIcon} />
                <Text numberOfLines={1} style={styles.location}>{item.details.address}</Text>
              </View>
            </View>
            <View style={styles.lowerContainer}>
              <View style={styles.pricingContainer}>
                <Image source={IMAGES.pound} style={styles.poundIcon} />
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const searchData = text => {
    const filteredList = locationListing.filter(item =>
      item?.property_name.toLowerCase().includes(text.toLowerCase()) || 
      item?.price.toLowerCase().includes(text.toLowerCase()) ||
      item?.details?.address.toLowerCase().includes(text.toLowerCase()) ||
      item?.max_room.toLowerCase().includes(text.toLowerCase())

    );
    setSearchingList(filteredList);
  };

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
          onChangeText={text => searchData(text)}
        />
        {searchingList.length === 0 ? (
          <View style={styles.locationNotFoundContainer}>
            <Text style={styles.locationNotFoundText}>
              No Such Property is Listed
            </Text>
            <Text style={styles.locationNotFoundSubText}>
              Please add relevant value
            </Text>
          </View>
        ) : (
          <FlatList
            data={searchingList}
            renderItem={renderLocationList}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  scrollView: {
    backgroundColor: COLORS.white,
  },
  searchContainer: {
    marginTop: 5,
  },
  listItemText: {
    color: COLORS.black,
    fontSize: 20,
  },
  propertyType:{
    fontSize: 15,
    color: COLORS.mediumTextColor,
    marginTop: 5,
  },
  location: {
    fontSize: 15,
    color: COLORS.lightTextColor,
  },
  roomsAvailable: {
    fontSize: 15,
    color: COLORS.lightTextColor,
  },
  listItemContainer: {
    marginBottom: 10,
  },
  listItemChildContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap: 30,
    marginTop: 10,
    borderColor: COLORS.placeholderBackgroundColor,
    borderWidth: 1,
    borderRadius: 10,
  },
  imageContainer: {
    width: '30%',
  },
  dataContainer: {
    // width: '65%',
    justifyContent: 'space-between',
    padding: 5,
  },
  propertyImage: {
    height: 140,
    width: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationIcon: {
    height: 16,
    width: 16,
  },
  pricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  price: {
    color: COLORS.black,
    fontSize: 20,
    marginLeft: -3,
  },
  locationNotFoundContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    marginTop: 50,
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
  poundIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  }
});

export default PropertyListingScreen;
