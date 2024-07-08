import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS, COMMOM, FONTS, IMAGES} from '../../constants';
import {Header} from '../../components/Header';
import Button from '../../components/Button';
import {ROUTES} from '../../constants/routes';
import colors from '../../constants/colors';

const PropertyListingDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {propertyDetails} = route.params;


  const getTour = (URL) => {
    navigation.navigate(ROUTES.VIRTUAL_TOUR, {
      get360View: URL,
    });
  };

  return (
    <>
      <ImageBackground
        source={{uri: propertyDetails.image}}
        resizeMode="stretch"
        style={styles.backgroundImage}>
        <Header
          iconName={'chevron-small-left'}
          style={styles.headerBackground}
          iconBackground={styles.headerIconBackground}
          rightIcon={'heart'}
          rightIconBackground={styles.rightHeaderIconBackground}
          openDrawer={() => navigation.goBack()}
        />
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        edgesForExtendedLayout={[]}>
        <View style={styles.locationDetailsContainer}>
          <View style={styles.locationTitleContainer}>
            <Text style={styles.propertyName}>{propertyDetails?.property_name}</Text>
            <TouchableOpacity onPress={() => getTour(propertyDetails?.video_url)}>
              <Image
                source={IMAGES.VirtualTour}
                style={styles.virtualTourImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.locationContainer}>
            <Image
              source={IMAGES.Location}
              resizeMode="contain"
              style={styles.locationImage}
            />
            <Text style={styles.locationName}>{propertyDetails?.details?.address}</Text>
          </View>
          {/* pointsContainer */}
          <View style={styles.pointsContainer}>
            <View style={styles.singlePointContainer}>
              <View style={styles.starContainer}>
                <Image
                  source={IMAGES.star}
                  style={styles.starImage}
                  tintColor={'#B9776A'}
                />
              </View>
              <View>
                <Text style={{color: colors.lightTextColor}}>{propertyDetails.average_rating}</Text>
                <Text style={{color: colors.lightTextColor}}>Ratings</Text>
              </View>
            </View>

            <View style={styles.singlePointContainer}>
              <View style={styles.starContainer}>
                <Image
                  source={IMAGES.dollar}
                  style={styles.dollarImage}
                  tintColor={'#B9776A'}
                />
              </View>
              <View>
                <Text style={{color: colors.lightTextColor}}>{propertyDetails.price}</Text>
                <Text style={{color: colors.lightTextColor}}>Price Level</Text>
              </View>
            </View>

            <View style={styles.singlePointContainer}>
              <View style={styles.starContainer}>
                <Image
                  source={IMAGES.bed}
                  style={styles.bedImage}
                  tintColor={'black'}
                />
              </View>
              <View>
                <Text style={{color: colors.lightTextColor}}>{propertyDetails.beds}</Text>
                <Text style={{color: colors.lightTextColor}}>Beds</Text>
              </View>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.locationDetails}>
              {propertyDetails?.description}
            </Text>
          </View>
          <View style={styles.contactDetailsContainer}>
            <View style={styles.contactDetails}>
              <Image
                source={IMAGES.phone}
                style={styles.phoneImage}
                resizeMode="contain"
              />
              <Text style={styles.phoneText}>
                +{propertyDetails?.details?.phone}
              </Text>
            </View>
            <View style={styles.contactDetails}>
              <Image
                source={IMAGES.email}
                style={styles.emailImage}
                resizeMode="contain"
              />
              <Text style={styles.phoneText}>{propertyDetails?.details?.email}</Text>
            </View>
            <View style={styles.contactDetails}>
              <Image
                source={IMAGES.Location}
                style={styles.phoneImage}
                resizeMode="contain"
              />
              <Text style={styles.phoneText}>{/*propertyDetails.details.state + " " + */propertyDetails.details.city + " " + propertyDetails.details.country}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{backgroundColor:'white', paddingHorizontal: 20}}> 
        <Button title={'Book Now'} style={styles.button} />

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
  headerBackground: {
    backgroundColor: COLORS.transparent,
    marginTop: 10,
  },
  headerIconBackground: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 40,
    width: 40,
    marginLeft: COMMOM.paddingHorizantal,
  },
  rightHeaderIconBackground: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 40,
    width: 40,
    marginRight: COMMOM.paddingHorizantal,
  },
  locationDetailsContainer: {
    marginTop: 20,
    justifyContent: 'space-between',
  },
  locationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationImage: {height: 18, width: 18},
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
    // justifyContent:'space-between',
  },
  propertyName: {
    color: '#889B9B',
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationName: {
    color: COLORS.lightTextColor,
    fontSize: 16,
    // fontWeight: 'bold',
  },
  starImage: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  dollarImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  bedImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  starContainer: {
    height: 40,
    width: 40,
    backgroundColor: '#F7DBDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  backgroundImage: {
    height: 280,
    borderRadius: 20,
    // overflow: 'hidden',
  },
  pointsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  singlePointContainer: {flexDirection: 'row', alignItems: 'center', gap: 5},
  locationDetails: {
    fontSize: 16,
    fontFamily: FONTS.poppinsRegular,
    marginTop: 20,
    textAlign: 'auto',
  },
  locationPointsContainer: {
    gap: 10,
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
    marginTop: 10,
  },
  pointContainer: {
    backgroundColor: '#C8ECD7',
    paddingLeft: 5,
    paddingRight: 5,
    // paddingVertical: 5,
    // borderRadius: 10,
    // height: 40,
    // width: 100,
  },
  phoneImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  emailImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  contactDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },
  contactDetailsContainer: {
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: '#ebebeb',
    paddingLeft: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },
  phoneText: {
    // fontSize: 16,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.black,
  },
  button: {
    paddingBottom: COMMOM.paddingHorizantal,
  },
  virtualTourImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 10,
    tintColor: COLORS.black,
  },
});

export default PropertyListingDetailsScreen;
