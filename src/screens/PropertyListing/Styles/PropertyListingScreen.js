import { COLORS, COMMOM, FONTS } from "../../../constants";
import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  scrollView: {
    backgroundColor: COLORS.white,
  },
  searchContainer: {
    marginTop: 5,
  },
  listItemText: {
    color: COLORS.appColor,
    fontSize: '20rem',
  },
  propertyType:{
    fontSize: '15rem',
    color: COLORS.mediumTextColor,
    marginTop: '5rem',
  },
  location: {
    fontSize: '15rem',
    color: COLORS.black,
  },
  roomsAvailable: {
    fontSize: '15rem',
    color: COLORS.black,
  },
  listItemContainer: {
    marginBottom: '10rem',
  },
  listItemChildContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // backgroundColor: 'red',
    gap: '30rem',
    marginTop: '10rem',
    borderColor: COLORS.placeholderBackgroundColor,
    borderWidth: 1,
    borderRadius: '10rem',
    width: '100%'
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
    height: '140rem',
    width: '120rem',
    borderTopLeftRadius: '10rem',
    borderBottomLeftRadius: '10rem',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationIcon: {
    height: '16rem',
    width: '16rem',
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
    fontSize: '20rem',
  },
  locationNotFoundContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    marginTop: '50rem',
  },
  locationNotFoundText: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: '22rem',
    color: COLORS.mediumTextColor,
  },
  locationNotFoundSubText: {
    fontFamily: FONTS.poppinsRegular,
    fontSize: '18rem',
    color: COLORS.lightTextColor,
  },
  noSearchImage: {
    height: '200rem',
    width: '200rem',
    resizeMode: 'contain',
  },
  poundIcon: {
    height: '20rem',
    width: '20rem',
    resizeMode: 'contain',
  },
  viewAllText: {
    color: COLORS.appColor,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
