import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, COMMOM, FONTS, IMAGES } from '../../constants';
import Button from '../../components/Button';
import { ROUTES } from '../../constants/routes';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../../config';
import WebView from 'react-native-webview';
import ContactCard from '../../components/ContactComponent';
import ImageView from "react-native-image-viewing";

const PropertyListingDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userProfile = useSelector(state => state.auth.loginData)
  const [openInquiry, setOpenInquiry] = useState(false);
  const [inquiryDetails, setInquiryDetails] = useState({});
  const [error, setError] = useState({});
  const { propertyDetails } = route.params;

  const addInquiry = () => {
    setOpenInquiry(!openInquiry)
  }

  const handleChange = (name, value) => {
    setInquiryDetails(prevValue => ({ ...prevValue, [name]: value }));
  };

  const getTour = (URL) => {
    navigation.navigate(ROUTES.VIRTUAL_TOUR, {
      get360View: URL,
    });
  };

  const facilityData = [
    {
      id: 1,
      title: "Bathrooms",
      icon: IMAGES.bathroom,
      count: propertyDetails?.beds
    },
    {
      id: 2,
      title: "Price",
      icon: IMAGES.dollar,
      count: propertyDetails?.price
    },
    {
      id: 3,
      title: "Beds",
      icon: IMAGES.bed,
      count: propertyDetails?.bathroom
    },
    {
      id: 4,
      title: "Max Room's",
      icon: IMAGES.rooms,
      count: propertyDetails?.max_room
    }
  ]

  const facilityImages = [
    {
      id: 1,
      image: IMAGES.Trek1
    },
    {
      id: 2,
      image: IMAGES.Trek2
    },
    {
      id: 3,
      image: IMAGES.Trek3
    },
    {
      id: 4,
      image: IMAGES.Trek4
    }
  ]
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (!inquiryDetails.subject) {
      newErrors.subject = 'Subject cannot be empty';
      isValid = false;
    }
    if (!inquiryDetails.message) {
      newErrors.message = 'Message cannot be empty';
      isValid = false;
    }
    if (inquiryDetails.message.length < 10) {
      newErrors.message = 'Your message is too short. Please provide a more detailed message so we can thoroughly address your inquiry.';
      isValid = false;
    }
    setError(newErrors);
    return isValid;
  };


  const submitForm = async (userID, propertyID) => {
    if (validateForm()) {
      const inquiryForm = new FormData();
      inquiryForm.append('user_id', userID);
      inquiryForm.append('property_id', propertyID);
      inquiryForm.append('inquiry', inquiryDetails.message)
      inquiryForm.append('subject', inquiryDetails.subject)
      try {
        const response = await axios.post(`${BASE_URL}/addInquiry`, inquiryForm, {
          headers: {
            Authorization: TOKEN,
            'Content-Type': 'multipart/form-data',
          }
        })
        console.log(response.data);
        setInquiryDetails('')
        setError('')
      } catch (error) {
        console.log(error);
      }
    }
  }

  const renderImagesList = ({ item }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={styles.facilityImage}
        />
      </View>
    )
  }

  const closeModal = () => {
    setOpenInquiry(!openInquiry)
    setError('')
  }

  const renderFacilityData = ({ item }) => {
    return (
      <View style={styles.pointsContainer}>
        <View style={styles.singlePointContainer}>
          <View style={styles.starContainer}>
            <Image
              source={item.icon}
              style={styles.starImage}
              tintColor={COLORS.black}
            />
          </View>
          <View>
            <Text style={styles.countText}>{item.count}</Text>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
        </View>
      </View>
    )
  }

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={toggleReadMore}>
        <Text style={styles.locationDetails}>
          {isReadMore ? `${text.slice(0, 150)}...` : text}
        </Text>
        <Text style={[styles.locationReadMoreDetails, { color: COLORS.black, }]}>
          {isReadMore ? 'Read more...' : 'Show less...'}
        </Text>
      </TouchableOpacity>
    );
  };


  return (
    <>
      <WebView source={{ uri: propertyDetails?.video_url }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        edgesForExtendedLayout={[]}>
        <View style={styles.locationDetailsContainer}>
          <View style={styles.locationTitleContainer}>
            <Text style={styles.propertyName}>{propertyDetails?.property_name}</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => getTour(propertyDetails?.video_url)}>
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
          <View style={styles.facilityContainer}>
            <Text style={styles.propertyName}>Facility</Text>
            <View style={{ marginTop: 10 }}></View>
            <FlatList
              data={facilityData}
              renderItem={renderFacilityData}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.listContainer}
            />
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionContainerTitle}>Overview</Text>
            {
              propertyDetails?.description && propertyDetails?.description.length > 50 ?
                <ReadMore>
                  {propertyDetails?.description}
                </ReadMore>
                :
                <Text>
                  {propertyDetails?.description}
                </Text>
            }
          </View>
        </View>

        <View style={styles.facilityDescription}>
          <Text style={styles.propertyContactName}>Gallery Images</Text>
          <FlatList
            data={facilityImages}
            renderItem={renderImagesList}
            keyExtractor={item => item.id.toString()}
            horizontal
            contentContainerStyle={styles.imagesContianer}
          />
        </View>
        <Text style={styles.propertyContactName}>Contact and Location</Text>
        <ContactCard
          contactTitle={'Phone'}
          value={propertyDetails?.details?.phone}
          icon={IMAGES.phone}
        />
        <ContactCard
          contactTitle={'Email Address'}
          value={propertyDetails?.details?.email}
          icon={IMAGES.email}
        />
        <ContactCard
          contactTitle={'Location'}
          value={`${propertyDetails.details.state}, ${propertyDetails.details.city}, ${propertyDetails.details.country}`}
          icon={IMAGES.Location}
        />
        <ContactCard
          contactTitle={'Zip Code'}
          value={propertyDetails.details.zip_code}
          icon={IMAGES.zipCode}
        />
      </ScrollView>
      <View style={{ backgroundColor: 'white', paddingHorizontal: 20 }}>
        <Button title={'Inquire'} style={styles.button} performAction={addInquiry} />
      </View>
      <Modal animationType='fade' transparent={true} visible={openInquiry}>
        <View style={styles.inquiryContainer}>
          <Pressable onPress={closeModal}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
              <View >
                <View style={styles.formContainer}>
                  <Pressable style={styles.headerContainer} onPress={() => setOpenInquiry(!openInquiry)}>
                    <Image source={IMAGES.close} style={{ height: 24, width: 24 }} />
                  </Pressable>
                  <Text style={styles.inquiryText}>Please fill the form to send an inquiry.</Text>
                  <View style={{ marginTop: 20 }}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Subject:</Text>
                      <TextInput style={styles.subjectMessage} placeholderTextColor={COLORS.lightTextColor} placeholder='Add Subject' onChangeText={text => handleChange('subject', text)} />
                      {error.subject && <Text style={styles.errorText}>{error.subject}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Message:</Text>
                      <TextInput style={styles.inputMessage} placeholderTextColor={COLORS.lightTextColor} numberOfLines={4} multiline={true} placeholder='Add Message' onChangeText={text => handleChange('message', text)} />
                      {error.message && <Text style={styles.errorText}>{error.message}</Text>}
                    </View>
                    <Button title={'Submit'} style={styles.button} performAction={() => submitForm(userProfile.id, propertyDetails.id)} />
                  </View>
                </View>
              </View>
            </ScrollView>
          </Pressable>
        </View>
      </Modal>

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
  titleText: {
    fontSize: 16,
    color: COLORS.mediumTextColor
  },
  countText: {
    fontSize: 14,
    color: COLORS.lightTextColor
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
    marginTop: 10,
    justifyContent: 'space-between',
  },
  locationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationImage: { height: 18, width: 18 },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
    // justifyContent: 'space-between',

  },
  propertyName: {
    color: '#2D3715',
    fontSize: 20,
    fontWeight: 'bold',
  },
  facilityContainer: {
    marginTop: 20,
    width: '100%',
  },
  locationName: {
    color: COLORS.lightTextColor,
    fontSize: 16,
    // fontWeight: 'bold',
  },
  starImage: {
    height: 20,
    width: 20,
    resizeMode: 'center',
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
  // starContainer: {
  //   height: 40,
  //   width: 40,
  //   backgroundColor: '#F7DBDC',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 10,
  // },
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
  singlePointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  descriptionContainer: {
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 10,
    borderRadius: 10,
  },
  descriptionContainerTitle: {
    fontSize: 20,
    color: '#2D3715'
  },
  locationDetails: {
    fontSize: 16,
    fontFamily: FONTS.poppinsRegular,
    marginTop: 20,
    textAlign: 'justify',
  },
  locationReadMoreDetails: {
    fontSize: 16,
    fontFamily: FONTS.poppinsRegular,
    textAlign: 'justify',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    // padding: 20,
    marginTop: 20,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  contactDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  iconContainer: {
    backgroundColor: '#F0F4F8',
    borderRadius: 50,
    padding: 10,
    marginRight: 15,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#4A90E2',
  },

  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#8A8A8A',
    fontFamily: FONTS.poppinsRegular,
    marginBottom: 3,
  },
  value: {
    fontSize: 15,
    color: '#333333',
    fontFamily: FONTS.poppinsMedium,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
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
  inquiryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  inquiryText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.lightTextColor
  },
  input: {
    borderColor: COLORS.lightTextColor,
    borderWidth: 0.8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: COLORS.black
  },
  inputMessage: {
    borderColor: COLORS.lightTextColor,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 15,
    color: COLORS.lightTextColor
  },
  subjectMessage: {
    borderColor: COLORS.lightTextColor,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
    fontSize: 15,
    color: COLORS.lightTextColor
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: FONTS.poppinsRegular,
    paddingBottom: 10
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  pointsContainer: {
    width: '48%',
  },
  singlePointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    marginRight: 8,
    backgroundColor: '#F7DBDC',
    padding: 7,
    borderRadius: 5,
  },
  propertyContactName: {
    color: '#2D3715',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  facilityImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  imagesContianer:{
    marginTop: 10,
    gap: 10
  }
});

export default PropertyListingDetailsScreen;
