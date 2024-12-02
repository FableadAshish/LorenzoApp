import { StyleSheet } from "react-native";
import { COLORS, COMMOM, FONTS } from "../../../../constants";

export const styles = StyleSheet.create({
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
    color: COLORS.appColor,
  },
  welcomeHeader: {
    marginTop: 20,
    width: 300,
  },
  upperText: {
    fontSize: 40,
    color: COLORS.appColor,
    fontWeight: '300',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  beautifulText: {
    fontSize: 40,
    color: COLORS.appColor,
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
  loaderContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  labelText: {
    fontSize: 28,
    color: COLORS.appColor,
    fontWeight: '500',
  },
  viewAllText: {
    color: COLORS.appColor,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  locationImage: {
    height: 250,
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
    width: 200,
  },
  locationInfo: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  upperLocationInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingBottom: 10,
    // paddingHorizontal: 10,
  },
  locationLocation: {
    fontSize: 15,
    color: COLORS.lightTextColor,
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
