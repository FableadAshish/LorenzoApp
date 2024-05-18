import React, {useState} from 'react';
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
import {locationData} from '../../../constants/data';

const HomeScreen = ({navigation}) => {
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
              <Image source={IMAGES.star} style={styles.starIcon} />
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
                <Image source={IMAGES.menu} style={styles.menuIcon} />
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
                  <Text style={styles.labelText}>Latest Properties</Text>
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
