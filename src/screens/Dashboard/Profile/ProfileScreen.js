import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { COLORS, COMMOM, FONTS, IMAGES } from '../../../constants';
import ProfileList from '../../../components/Profile';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../constants/routes';
import Button from '../../../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../../components/Header';
import { fetchUserProfile } from '../../../redux/slice/profileSlice';
import { logout } from '../../../redux/slice/authSlice';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const userProfile = useSelector(state => state.auth.loginData)
  let userProfileData = useSelector((state) => state.profile.userProfileData.user);
  const logoutPermission = () => {
    setLogoutModal(!logoutModal);
    dispatch(logout())
    navigation.navigate(ROUTES.HOME)
  };

  const logoutUser = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    navigation.navigate(ROUTES.SIGNUP);
    setLogoutModal(!logoutModal);
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      dispatch(fetchUserProfile(userProfile.id))
    })
    return subscribe;
  }, []);


  return (
    <>
      <View style={styles.container}>
        <Header style={styles.headerStyles} title={'Profile'} openDrawer={() => navigation.goBack()} iconName={'chevron-small-left'} />
        <View style={styles.userDataContainer}>
          <Image
            source={userProfileData && userProfileData.profile ? { uri: userProfileData.profile } : IMAGES.ProfilePicture}
            style={styles.profilePicture}
          />
          <View style={styles.dataContainer}>
            <Text style={styles.name}>{userProfileData ? userProfileData.username : userProfile.username}</Text>
            <Text style={styles.email}>{userProfileData ? userProfileData.email : userProfile.email}</Text>
          </View>
        </View>
        <View style={styles.profileList}>
          <Text style={styles.preferencesText}>General</Text>
          <View style={{ marginTop: -30 }}>
            <ProfileList
              leftIcon={IMAGES.userPlaceholder}
              title={'Edit Profile'}
              rightIcon={IMAGES.rightArrow}
              navigateTo={() => navigation.navigate(ROUTES.EDIT_PROFILE)}
            />
            {/* <ProfileList
              leftIcon={IMAGES.language}
              title={'Language'}
              rightIcon={IMAGES.rightArrow}
            /> */}
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.preferencesText}>Preferences</Text>
          <View style={{ marginTop: -30 }}>
          </View>
        </View>
      </View>
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContaoiner}>
          <View style={styles.logoutContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Logout</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image
                  source={IMAGES.close}
                  style={styles.closeImage}
                  tintColor={COLORS.mediumTextColor}
                />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={styles.titleDescriptionText}>
                Your profile information will be saved to make things easier
                when you return. See you again!
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                innerStyle={styles.button}
                title={'Logout'}
                performAction={() => logoutPermission()}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={logoutModal} animationType="slide">
        <View style={styles.logoutModalContainer}>
          <View style={styles.logoutPermissionContainer}>
            <Image source={IMAGES.logoutPopup} style={styles.logoutIcon} />
            <Text style={styles.logoutTitle}>
              Are you sure, you want to logout.
            </Text>

            <View style={styles.cancelLogoutButton}>
              <Button
                innerStyle={styles.cancelButton}
                title={'Cancel'}
                performAction={() => setLogoutModal(false)}
                styleText={styles.cancelText}
              />
              <Button
                innerStyle={styles.logoutButton}
                title={'Logout'}
                performAction={() => closeModal()}
                styleText={styles.logoutText}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  profilePicture: {
    height: 80,
    width: 80,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 100,
  },
  dataContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    color: COLORS.black,
    fontFamily: FONTS.poppinsRegular,
  },
  email: {
    fontSize: 16,
    color: COLORS.lightTextColor,
    fontFamily: FONTS.poppinsRegular,
    marginTop: -5,
  },
  profileList: {
    marginTop: 30,
  },
  preferencesText: {
    fontSize: 20,
    color: COLORS.lightTextColor,
    fontFamily: FONTS.poppinsRegular,
    marginTop: 20,
    marginBottom: 10,
  },
  modalContaoiner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logoutContainer: {
    paddingBottom: 40,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  closeImage: {
    height: 30,
    width: 30,
  },
  titleText: {
    fontSize: 22,
    color: COLORS.mediumTextColor,
    fontFamily: FONTS.poppinsRegular,
  },
  titleDescriptionText: {
    fontSize: 15,
    color: COLORS.lightTextColor,
    fontFamily: FONTS.poppinsRegular,
    marginTop: 20,
  },
  buttonContainer: {
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  button: {
    backgroundColor: '#ED1F4F',
  },
  logoutModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  logoutPermissionContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  logoutTitle: {
    fontSize: 20,
    color: COLORS.black,
    fontFamily: FONTS.poppinsRegular,
  },
  cancelLogoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 150,
  },
  cancelText: {
    color: COLORS.black,
    fontFamily: FONTS.poppinsRegular,
    fontSize: 18,
  },
  logoutButton: {
    paddingHorizontal: 20,
    backgroundColor: '#F15A24',
    borderRadius: 5,
    width: 150,
  },
  logoutText: {
    color: COLORS.white,
    fontFamily: FONTS.poppinsRegular,
    fontSize: 18,
  },
  logoutIcon: {
    height: 150,
    width: 150,
  },
  headerStyles: {
    paddingHorizontal: 20
  }
});

export default ProfileScreen;
