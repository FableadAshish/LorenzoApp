import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
  TouchableOpacity,
  FlatList,
  Platform,
  Linking,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS, FONTS, IMAGES} from '../../constants';
import Button from '../../components/Button';
import {ROUTES} from '../../constants/routes';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {BASE_URL, TOKEN} from '../../config';
import WebView from 'react-native-webview';
import ContactCard from '../../components/ContactComponent';
import ImageView from 'react-native-image-viewing';
import {ActivityIndicator} from 'react-native';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './Styles/PropertyListingDetailsScreenStyles';
import {InquiryForm} from '../../components/molecules/InquiryForm';
import {Header} from '../../components/Header';

const PropertyListingDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userProfile = useSelector(state => state.auth.loginData);
  const [openInquiry, setOpenInquiry] = useState(false);
  const [inquiryDetails, setInquiryDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const {propertyDetails} = route.params;

  const addInquiry = () => {
    setOpenInquiry(!openInquiry);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [flooerImages, setFloorImagesVisible] = useState(0);
  const [floorIsVisible, setFloorisVisible] = useState(false);
  const [isWebViewLoading, setIsWebViewLoading] = useState(true);
  const [venueDetails, setVenueDetails] = useState({
    subject: '',
    inquiry: '',
  });
  const [venueErrors, setVenueErrors] = useState({});

  const handleSetIsVisible = index => {
    setCurrentImageIndex(index);
    setIsVisible(true);
  };

  const handleChange = (name, value) => {
    setInquiryDetails(prevValue => ({...prevValue, [name]: value}));
  };

  const handleVenueChange = (name, value) => {
    setVenueDetails(prevValue => ({...prevValue, [name]: value}));
  };

  const getTour = URL => {
    navigation.navigate(ROUTES.VIRTUAL_TOUR, {
      get360View: URL,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    if (inquiryDetails.subject == '') {
      newErrors.subject = 'Subject cannot be empty';
      isValid = false;
    }
    if (inquiryDetails.subject == undefined) {
      newErrors.subject = 'Subject cannot be empty';
      isValid = false;
    }
    if (
      inquiryDetails.phone == undefined ||
      inquiryDetails.phone.length < 10 == undefined
    ) {
      newErrors.phone = 'Phone number must be atleast 10 digits';
      isValid = false;
    }
    if (inquiryDetails.inquiry === '') {
      newErrors.inquiry = 'Message cannot be empty';
      isValid = false;
    }
    if (inquiryDetails.inquiry == undefined) {
      newErrors.inquiry = 'Message cannot be empty';
      isValid = false;
    }
    if (inquiryDetails.inquiry && inquiryDetails.inquiry.length < 10) {
      newErrors.inquiry =
        'Your message is too short. Please provide a more detailed message so we can thoroughly address your inquiry.';
      isValid = false;
    }
    setError(newErrors);
    return isValid;
  };

  const isContactVenueValidate = () => {
    let isValid = true;
    const newErrors = {};
    if (venueDetails.subject === '') {
      newErrors.subject = 'Subject cannot be empty';
      isValid = false;
    }

    if (venueDetails.inquiry === '' || venueDetails.inquiry.length < 10) {
      newErrors.inquiry = 'Your message is too short.';
      isValid = false;
    }
    setVenueErrors(newErrors);
    return isValid;
  };

  const submitForm = async (userID, propertyID) => {
    if (validateForm()) {
      const inquiryForm = new FormData();
      inquiryForm.append('user_id', userID);
      inquiryForm.append('property_id', propertyID);
      inquiryForm.append('inquiry', inquiryDetails.inquiry);
      inquiryForm.append('phone', inquiryDetails.phone);
      inquiryForm.append('subject', inquiryDetails.subject);

      try {
        setIsLoading(true);
        const response = await axios.post(
          `${BASE_URL}/addInquiry`,
          inquiryForm,
          {
            headers: {
              Authorization: TOKEN,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log(response.data);
        setInquiryDetails('');
        setError('');
        setIsLoading(false);
        closeModal();
        Toast.show(
          'We have received your inquiry and will review it shortly. Thank you for reaching out to us.',
        );
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  const submitContactVenueForm = async (userID, propertyID) => {
    // if (isContactVenueValidate()) {
    const contactVenueForm = new FormData();
    contactVenueForm.append('user_id', 22);
    contactVenueForm.append('property_id', 99);
    contactVenueForm.append('message', venueDetails.inquiry);
    contactVenueForm.append('subject', venueDetails.subject);
    console.log('contactVenueForm', contactVenueForm);
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}/contactVenueMail`,
        contactVenueForm,
        {
          headers: {
            Authorization: TOKEN,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('response.data', response.data);
      // setVenueDetails('');
      // setVenueErrors('');
      // // setIsLoading(false);
      // Toast.show(
      //   'We have received your inquiry and will review it shortly. Thank you for reaching out to us.',
      // );
    } catch (error) {
      console.log('error', error.response.data.message);
      setIsLoading(false);
    }
    // }
  };

  const closeModal = () => {
    setOpenInquiry(!openInquiry);
    setError('');
  };
  const ReadMore = ({children}) => {
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
        <Text
          style={[
            styles.locationReadMoreDetails,
            {color: COLORS.appColor},
          ]}>
          {isReadMore ? 'read more...' : 'show less'}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderImages = ({item, index}) => (
    <TouchableOpacity onPress={() => handleSetIsVisible(index)}>
      <Image source={{uri: item}} style={styles.thumbnailImage} />
    </TouchableOpacity>
  );

  const renderFloorImages = ({item, index}) => (
    <TouchableOpacity onPress={() => handleFloorImagesVisible(index)}>
      <Image source={{uri: item}} style={styles.thumbnailImage} />
    </TouchableOpacity>
  );

  const handleFloorImagesVisible = index => {
    setFloorImagesVisible(index);
    setFloorisVisible(true);
  };

  const dialCall = phone => {
    let phoneNumber = '';
    phoneNumber = `tel:${phone}`;
    Linking.openURL(phoneNumber);
  };

  const mail = email => {
    let toEmail = '';
    toEmail = `mailto:${email}`;
    Linking.openURL(toEmail);
  };
  const openGoogleMapsSearch = query => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query,
    )}`;
    Linking.openURL(url).catch(err =>
      console.error('Error opening Google Maps:', err),
    );
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <Header
        iconName={'chevron-small-left'}
        openDrawer={() => navigation.goBack()}
        style={styles.header}
      />
      <View style={styles.webViewContainer}>
        <WebView
          source={{uri: propertyDetails?.video_url}}
          onLoadStart={() => setIsWebViewLoading(true)}
          onLoadEnd={() => setIsWebViewLoading(false)}
        />
        {isWebViewLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.white} />
          </View>
        )}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        edgesForExtendedLayout={[]}>
        <View style={styles.locationDetailsContainer}>
          <View style={styles.locationTitleContainer}>
            <Text style={styles.propertyName}>
              {propertyDetails?.property_name}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => getTour(propertyDetails?.video_url)}>
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
              tintColor={COLORS.appColor}
            />
            <Text style={styles.locationName}>
              {propertyDetails?.details?.address}
            </Text>
          </View>
          <View style={styles.separator} />

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionContainerTitle}>Overview</Text>
            {propertyDetails?.description &&
            propertyDetails?.description.length > 50 ? (
              <ReadMore>{propertyDetails?.description}</ReadMore>
            ) : (
              <Text style={styles.descriptionText}>{propertyDetails?.description}</Text>
            )}
          </View>
        </View>

        <View style={styles.separator} />
        {/* <View style={styles.container}> */}
        <View style={styles.floorPlanContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 25,
            }}>
            <Text style={styles.propertyContactName}>Gallery Images -</Text>
            <Image
              source={IMAGES.imageGallery}
              style={{height: 25, width: 25}}
              tintColor={COLORS.appColor}
            />
          </View>
          {/* {propertyDetails.images && propertyDetails.images.length > 0 ? ( */}
          <FlatList
            data={propertyDetails.images}
            renderItem={renderImages}
            horizontal
            contentContainerStyle={styles.galleryImagesContainer}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View>
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 14,
                    fontFamily: FONTS.poppinsRegular,
                  }}>
                  Currently, there are no Gallery Images
                </Text>
              </View>
            }
          />
          {/* // ) : (
          //   <View style={{paddingVertical: 20}}>
          //     <Text style={{color: COLORS.black, fontSize: 14, fontFamily: FONTS.poppinsRegular}}>Currently, there are no Images</Text>
          //   </View>
          // )} */}

          <ImageView
            images={propertyDetails.images.map(uri => ({uri}))}
            imageIndex={currentImageIndex}
            presentationStyle="overFullScreen"
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
            onImageIndexChange={setCurrentImageIndex}
            FooterComponent={() => (
              <View style={styles.root}>
                <Text style={styles.text}>{`${currentImageIndex + 1}/${
                  propertyDetails.images.length
                }`}</Text>
              </View>
            )}
          />
          <View style={styles.separator} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 25,
          }}>
          <Text style={styles.propertyContactName}>Floor Plan -</Text>
          <Image source={IMAGES.blueprint} style={{height: 25, width: 25}} />
        </View>

        <FlatList
          data={propertyDetails.floor_plans}
          renderItem={renderFloorImages}
          horizontal
          contentContainerStyle={styles.galleryImagesContainer}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 14,
                  fontFamily: FONTS.poppinsRegular,
                }}>
                Currently, there is no floor plan
              </Text>
            </View>
          }
        />

        <ImageView
          images={propertyDetails.floor_plans.map(uri => ({uri}))}
          imageIndex={flooerImages}
          presentationStyle="overFullScreen"
          visible={floorIsVisible}
          onRequestClose={() => setFloorisVisible(false)}
          onImageIndexChange={setFloorImagesVisible}
          FooterComponent={() => (
            <View style={styles.root}>
              <Text style={styles.text}>{`${flooerImages + 1}/${
                propertyDetails.floor_plans.length
              }`}</Text>
            </View>
          )}
        />
        <View style={styles.separator} />

        {/* </View> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 25,
          }}>
          <Text style={styles.propertyContactName}>Contact and Location -</Text>
          <Image
            source={IMAGES.call}
            style={{height: 25, width: 25}}
            tintColor={COLORS.appColor}
          />
        </View>
        <ContactCard
          contactTitle={'Phone'}
          value={propertyDetails?.details?.phone}
          icon={IMAGES.phone}
          onPress={() => dialCall(propertyDetails?.details?.phone)}
        />
        <ContactCard
          contactTitle={'Email Address'}
          value={propertyDetails?.details?.email}
          icon={IMAGES.email}
          onPress={() => mail(propertyDetails?.details?.email)}
        />
        <ContactCard
          contactTitle={'Location'}
          value={`${propertyDetails.details.state}, ${propertyDetails.details.city}, ${propertyDetails.details.country}`}
          icon={IMAGES.Location}
          onPress={() => openGoogleMapsSearch(propertyDetails.details.city)}
        />
        {/* <ContactCard
          contactTitle={'Zip Code'}
          value={propertyDetails.details.zip_code}
          icon={IMAGES.zipCode}
        /> */}
        <Button
          title={'Submit Inquiry'}
          style={styles.button}
          performAction={addInquiry}
        />
        <View style={styles.separator} />
        <View contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.contactFormContainer}>
            <Text style={styles.propertyContactName}>Contact Venue Form</Text>
            <View style={{marginTop: 20}}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Subject:</Text>
                <TextInput
                  style={styles.subjectMessage}
                  placeholderTextColor={COLORS.lightTextColor}
                  placeholder="Add Subject"
                  onChangeText={text => handleVenueChange('subject', text)}
                  value={inquiryDetails.subject}
                />
                {venueErrors.subject && (
                  <Text style={styles.errorText}>{venueErrors.subject}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Message:</Text>
                <TextInput
                  style={styles.inputMessage}
                  placeholderTextColor={COLORS.lightTextColor}
                  numberOfLines={4}
                  multiline={true}
                  placeholder="Add Message"
                  onChangeText={text => handleVenueChange('inquiry', text)}
                  value={inquiryDetails.inquiry}
                />
                {venueErrors.inquiry && (
                  <Text style={styles.errorText}>{venueErrors.inquiry}</Text>
                )}
              </View>
              <Button
                title={
                  isLoading ? (
                    <ActivityIndicator color={COLORS.white} size={22} />
                  ) : (
                    'Submit'
                  )
                }
                style={styles.submitContactVenueButton}
                performAction={() => {
                  submitContactVenueForm(userProfile.id, propertyDetails.id);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Submit Inquiry Form */}
      <Modal animationType="fade" transparent={true} visible={openInquiry}>
        <View style={styles.inquiryContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.formContainer}>
              <Pressable style={styles.headerContainer} onPress={closeModal}>
                <Image source={IMAGES.close} style={{height: 24, width: 24}} />
              </Pressable>
              <Text style={styles.inquiryText}>
                Please fill the form to send an inquiry.
              </Text>
              <View style={{marginTop: 20}}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Subject:</Text>
                  <TextInput
                    style={styles.subjectMessage}
                    placeholderTextColor={COLORS.lightTextColor}
                    placeholder="Add Subject"
                    onChangeText={text => handleChange('subject', text)}
                    value={inquiryDetails.subject}
                  />
                  {error.subject && (
                    <Text style={styles.errorText}>{error.subject}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Mobile number:</Text>
                  <TextInput
                    style={styles.subjectMessage}
                    placeholderTextColor={COLORS.lightTextColor}
                    placeholder="Add Number"
                    onChangeText={text => handleChange('phone', text)}
                    value={inquiryDetails.phone}
                    keyboardType="numeric"
                  />
                  {error.subject && (
                    <Text style={styles.errorText}>{error.subject}</Text>
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Message:</Text>
                  <TextInput
                    style={styles.inputMessage}
                    placeholderTextColor={COLORS.lightTextColor}
                    numberOfLines={4}
                    multiline={true}
                    placeholder="Add Message"
                    onChangeText={text => handleChange('inquiry', text)}
                    value={inquiryDetails.inquiry}
                  />
                  {error.inquiry && (
                    <Text style={styles.errorText}>{error.inquiry}</Text>
                  )}
                </View>
                <Button
                  title={
                    isLoading ? (
                      <ActivityIndicator color={COLORS.white} size={22} />
                    ) : (
                      'Submit'
                    )
                  }
                  style={styles.submitInquiryButton}
                  performAction={() => {
                    submitForm(userProfile.id, propertyDetails.id);
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Add Contact form */}
    </KeyboardAwareScrollView>
  );
};

export default PropertyListingDetailsScreen;
