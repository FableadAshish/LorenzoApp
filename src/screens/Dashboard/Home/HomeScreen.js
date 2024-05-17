import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, COMMOM, FONTS, IMAGES} from '../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchContainer from '../../../components/SearchContainer/SearchContainer';
import {ROUTES} from '../../../constants/routes';

const HomeScreen = ({navigation}) => {
  const locationData = [
    {
      id: 1,
      name: 'Niladri Reserviour',
      location: 'Surat, Gujrat',
      locationImage: IMAGES.Trek1,
      ratings: 4.5,
      roomsAvailable: 2,
      price: 150,
      locationDetails:
        'Enjoy the beauty of summer with various attractions available here, as well as various complete facilities, avaoilable at affordable prices, for all tourists from all accross the world',
      videoUrl:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      propertyDetailsPoints: [
        'Panoramic Views',
        'Outdoor Activities',
        'Family-friendly',
        'Spacious Rooms',
        'Modern Amenities',
      ],
      phoneNumber: '1234567900',
      email: 'niladri.reserviour@example.com',
      address: '123 Niladri Rd, Surat, Gujarat 395001',
    },
    {
      id: 2,
      name: 'Darma Reserviour',
      location: 'Darma, Gujrat',
      locationImage: IMAGES.Trek2,
      ratings: 4.7,
      roomsAvailable: 5,
      price: 120,
      locationDetails:
        'Experience the tranquility of nature at this serene reservoir, offering stunning views and peaceful surroundings for a rejuvenating getaway.',
      videoUrl:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      propertyDetailsPoints: [
        'Vegeterian Family',
        'Vegan',
        'Sunny View',
        '2 BedRoom',
        'Lavisk Collection',
      ],
      phoneNumber: '9876543210',
      email: 'darma.reserviour@example.com',
      address: '456 Darma Blvd, Darma, Gujarat 395002',
    },
    {
      id: 3,
      name: 'Niladri Reserviour',
      location: 'Surat, Gujrat',
      locationImage: IMAGES.Trek3,
      ratings: 4.9,
      roomsAvailable: 7,
      price: 100,
      locationDetails:
        'Discover the hidden gem of Surat, where crystal-clear waters and lush greenery create a picturesque setting for a memorable vacation.',
      videoUrl:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      propertyDetailsPoints: [
        'Waterfront Location',
        'Eco-friendly Practices',
        'Spa and Wellness Center',
        'Gourmet Dining',
        'Luxury Accommodations',
      ],
      phoneNumber: '5555555555',
      email: 'niladri2.reserviour@example.com',
      address: '789 Niladri Ln, Surat, Gujarat 395003',
    },
    {
      id: 4,
      name: 'Darma Reserviour',
      location: 'Darma, Gujrat',
      locationImage: IMAGES.Trek4,
      ratings: 4.1,
      roomsAvailable: 3,
      price: 200,
      locationDetails:
        'Immerse yourself in the rich cultural heritage and natural beauty of Darma, where this reservoir offers a unique blend of adventure and relaxation.Immerse yourself in the rich cultural heritage and natural beauty of Darma, where this reservoir offers a unique blend of adventure and relaxation',
      videoUrl:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      propertyDetailsPoints: [
        'Panoramic Views',
        'Outdoor Activities',
        'Family-friendly',
        'Spacious Rooms',
        'Modern Amenities',
      ],
      phoneNumber: '1112223333',
      email: 'darma2.reserviour@example.com',
      address: '456 Darma Ave, Darma, Gujarat 395004',
    },
  ];
  const [searchQuery, setSearchQuery] = useState(locationData);

  const searchData = text => {
    const filteredList = locationData.filter(
      item =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.roomsAvailable.toString().includes(text),
    );
    setSearchQuery(filteredList);
  };

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
        <Image source={item.locationImage} style={styles.locationImage} />
        <View style={styles.locationInfo}>
          <View style={styles.upperLocationInfo}>
            <View style={styles.leftLocation}>
              <Text style={styles.locationName}>{item.name}</Text>
            </View>
            <View style={styles.ratingsContainer}>
              <Icon name="star" size={18} color={COLORS.lightOrange} />
              <Text style={styles.locationRatings}>{item.ratings}</Text>
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <Image style={styles.locationIcon} source={IMAGES.Location} />
            <Text style={styles.locationLocation}>{item.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const RouteToPropertyListing = locationData => {
    navigation.navigate(ROUTES.PROPERTY_LISTING, {
      locationListing: locationData,
    });
    // console.log(locationData);
  };
  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.leftContainer}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name="menu" size={30} color="black" />
              </TouchableOpacity>
              <View>
                <Text style={styles.centerNameStyle}>John Doe</Text>
              </View>
            </View>

            <Image
              source={{
                uri: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              }}
              style={styles.homeProfileImage}
            />
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

          <View style={styles.listContainer}>
            {searchQuery.length === 0 ? (
              <View style={styles.locationNotFoundContainer}>
                <Image source={IMAGES.NoSearch} style={styles.noSearchImage} />
                <Text style={styles.locationNotFoundText}>
                  No Such Property is Listed
                </Text>
                <Text style={styles.locationNotFoundSubText}>
                  Please add relevant value
                </Text>
              </View>
            ) : (
              <>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>Best Destination</Text>
                  <TouchableOpacity
                    onPress={() => RouteToPropertyListing(locationData)}>
                    <Text style={styles.viewAllText}>View all</Text>
                  </TouchableOpacity>
                </View>
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
      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.CHAT)}
        style={styles.contactButtonContainer}
        activeOpacity={0.8}>
        <Image source={IMAGES.chatBot} style={styles.chatBotImage} />
      </TouchableOpacity>
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
  labelText: {
    fontSize: 28,
    color: COLORS.black,
    fontWeight: '500',
  },
  viewAllText: {
    color: COLORS.lightBlueText,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  locationImage: {
    height: 300,
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
  },
  locationInfo: {
    marginTop: 20,
    paddingHorizontal: 8,
  },
  upperLocationInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
  },
  ratingsContainer: {
    flexDirection: 'row',
    gap: 2,
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
  },
  locationLocation: {
    fontSize: 15,
    color: COLORS.lightTextColor,
  },
  locationNotFoundContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
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
});

export default HomeScreen;
