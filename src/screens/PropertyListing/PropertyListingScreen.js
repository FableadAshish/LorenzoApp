import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {COLORS, COMMOM, IMAGES} from '../../constants';
import {useRoute, useNavigation} from '@react-navigation/native';
import SearchContainer from '../../components/SearchContainer/SearchContainer';
import {Header} from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';

const PropertyListingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {locationListing} = route.params;
  // console.log('Got it:-',
  // id": 1,
  // "location": "Surat, Gujrat",
  // "locationImage": 3,
  // "name": "Niladri Reserviour",
  // "ratings": 4.5});{"

  // console.log('Got it', locationListing)

  const renderLocationList = ({item}) => {
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.listItemChildContainer}>
          <View style={styles.imageContainer}>
            <Image source={item.locationImage} style={styles.propertyImage} />
          </View>
          <View style={styles.dataContainer}>
            <View>
              <Text style={styles.listItemText}>{item.name}</Text>
              <Text style={styles.roomsAvailable}>
                {item.roomsAvailable} rooms Available
              </Text>
              <View style={styles.locationContainer}>
                <Image source={IMAGES.Location} style={styles.locationIcon} />
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
            <View style={styles.lowerContainer}>
              <View style={styles.pricingContainer}>
                <Foundation name="pound" size={25} color="black" />
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.pricePerMonth}>/mo</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={18} color={COLORS.lightOrange} />
                <Text style={styles.ratings}>{item.ratings}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView style={styles.scrollView} />
      <StatusBar backgroundColor={COLORS.white} />
      <View style={styles.container}>
        <Header
          iconName={'chevron-small-left'}
          title={'Property Listings'}
          openDrawer={() => navigation.goBack()}
        />
        <SearchContainer
          placeholderTitle={'Search Properties ...'}
          style={styles.searchContainer}
        />
        <View style={styles.listContainer}>
          <FlatList
            data={locationListing}
            renderItem={renderLocationList}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={true}
          />
        </View>
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
  location: {
    fontSize: 15,
    color: COLORS.lightTextColor,
  },
  roomsAvailable: {
    fontSize: 15,
    color: COLORS.lightTextColor,
  },
  listItemContainer: {
    marginTop: 20,
  },
  listItemChildContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imageContainer: {
    width: '30%',
  },
  dataContainer: {
    width: '65%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  propertyImage: {
    height: 150,
    width: 120,
    borderRadius: 10,
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
    // gap: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    width: '100%',
  },
  price: {
    color: COLORS.black,
    fontSize: 20,
  },
  pricePerMonth: {
    color: COLORS.lightTextColor,
    fontSize: 20,
  },
  ratings: {
    color: COLORS.lightTextColor,
    fontSize: 15,
  },
});

export default PropertyListingScreen;
