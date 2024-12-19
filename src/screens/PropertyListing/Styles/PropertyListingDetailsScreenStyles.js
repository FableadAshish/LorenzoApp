import {StyleSheet} from 'react-native';
import {COLORS, COMMOM, FONTS} from '../../../constants';
import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  headerBackground: {
    backgroundColor: COLORS.transparent,
    marginTop: '10rem',
  },
  headerIconBackground: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50rem',
    height: 40,
    width: 40,
    marginLeft: COMMOM.paddingHorizantal,
  },
  titleText: {
    fontSize: 16,
    color: COLORS.mediumTextColor,
  },
  countText: {
    fontSize: 14,
    color: COLORS.lightTextColor,
  },
  rightHeaderIconBackground: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50rem',
    height: 40,
    width: 40,
    marginRight: COMMOM.paddingHorizantal,
  },
  locationDetailsContainer: {
    marginTop: '10rem',
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
    // marginTop: 5,
    // justifyContent: 'space-between',
  },
  propertyName: {
    color: COLORS.appColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  facilityContainer: {
    marginTop: 20,
    width: '100%',
  },
  locationName: {
    color: COLORS.appColor,
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
  //   borderRadius: '10rem',
  // },
  backgroundImage: {
    height: 280,
    borderRadius: 20,
    // overflow: 'hidden',
  },
  // pointsContainer: {
  //   // marginTop: 20,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  singlePointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  descriptionContainer: {
    marginTop: 20,
    borderRadius: '10rem',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: '10rem',
    borderRadius: '10rem',
  },
  descriptionContainerTitle: {
    fontSize: 20,
    color: COLORS.appColor,
  },
  locationDetails: {
    fontSize: 16,
    fontFamily: FONTS.poppinsRegular,
    marginTop: '10rem',
    textAlign: 'justify',
    color: COLORS.mediumTextColor,
  },
  locationReadMoreDetails: {
    fontSize: 16,
    fontFamily: FONTS.poppinsRegular,
    textAlign: 'justify',
    color: COLORS.lightGrey,
  },
  locationPointsContainer: {
    gap: '10rem',
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
    marginTop: '10rem',
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
    marginTop: '10rem',
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
    borderRadius: '50rem',
    padding: '10rem',
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
    marginTop: 30,
  },

  phoneText: {
    // fontSize: 16,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.black,
  },
  button: {
    // paddingBottom: COMMOM.paddingHorizantal,
  },
  virtualTourImage: {
    height: '35rem',
    width: '35rem',
    resizeMode: 'contain',
    marginTop: '10rem',
    marginBottom: '10rem',
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
    borderRadius: '10rem',
    width: '90%',
  },
  contactFormContainer: {
    backgroundColor: COLORS.bgColor,
    borderRadius: '10rem',
    width: '100%',
    marginTop: '20rem'
    // paddingHorizontal: 20,
  },
  inquiryText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.lightTextColor,
  },
  input: {
    borderColor: COLORS.lightTextColor,
    borderWidth: 0.8,
    paddingHorizontal: '10rem',
    marginBottom: '10rem',
    borderRadius: 5,
    marginTop: '10rem',
  },
  inputLabel: {
    fontSize: '16rem',
    color: COLORS.appColor,
    fontFamily: FONTS.poppinsRegular
  },
  inputMessage: {
    borderColor: COLORS.black,
    borderWidth: 0.5,
    paddingHorizontal: '10rem',
    marginBottom: '10rem',
    borderRadius: 5,
    marginTop: '10rem',
    height: 100,
    textAlignVertical: 'top',
    fontSize: 15,
    color: COLORS.lightTextColor,
    backgroundColor: COLORS.textFieldColor
  },
  subjectMessage: {
    borderColor: COLORS.black,
    borderWidth: 0.5,
    paddingHorizontal: '10rem',
    marginBottom: '10rem',
    borderRadius: 5,
    marginTop: '10rem',
    height: '50rem',
    fontSize: 15,
    color: COLORS.lightTextColor,
    backgroundColor: COLORS.textFieldColor
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: FONTS.poppinsRegular,
    paddingBottom: '10rem',
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
    color: COLORS.appColor,
    fontSize: 20,
    fontWeight: 'bold',
    // marginTop: 20,
  },
  imagesContianer: {
    marginTop: '10rem',
    gap: '10rem',
  },
  galleryImagesContainer: {
    // gap: 1,
    marginTop: 20,
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    borderRadius: '10rem',
    marginRight: '10rem',
  },
  floorPlanContainer: {},
  webViewContainer: {
    height: 300, // Adjust this height as needed
    width: '100%',
    position: 'relative',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgColor,
  },
  submitContactVenueButton: {
    paddingBottom:'20rem'
  },
  header: {
    height: 60,
  },
  descriptionText: {
    color: COLORS.appColor,
    fontFamily: FONTS.poppinsRegular,
    fontSize: 14
  }
});
