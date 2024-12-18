import { StyleSheet } from "react-native";
import { COLORS, COMMOM } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.bgColor
  },
  drawerHeader: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerHeaderText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: 15,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    gap: 10,
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 8,
    height: 60,
  },
  listImgStyle: {
    height: 22,
    width: 22,
  },
  listTxtStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.appColor,
    marginLeft: -2,
    letterSpacing: 0.6,
  },
  homeProfileImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.appColor,
    marginLeft: 10,
    letterSpacing: 0.6,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.lightTextColor,
    marginLeft: 10,
    letterSpacing: 0.6,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    padding: 20,
    width: '100%',
  },
  profileLeftContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerButton: {
    paddingHorizontal: COMMOM.paddingHorizantal,
    paddingBottom: COMMOM.paddingHorizantal,
  },
  drawerButtonInnerStyle: {
    borderRadius: 50,
    backgroundColor: COLORS.lightPrimaryColor,
    height: 50,
  },
  imageContainer: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 10,
  },
  rightIcon: {
    height: 16,
    width: 16,
    tintColor: COLORS.black,
    resizeMode: 'contain',
  },
  drawerList: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    gap: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
