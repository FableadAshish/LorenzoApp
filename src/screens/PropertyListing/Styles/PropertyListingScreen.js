import { StyleSheet } from "react-native";
import { COLORS, COMMOM, FONTS } from "../../../constants";

export const styles = StyleSheet.create({
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
    color: COLORS.appColor,
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
