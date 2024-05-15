import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {COLORS, COMMOM, FONTS, IMAGES} from '../../../constants';
import EditProfileComp from '../../../components/EditProfile';
import EditModal from '../../../components/EditModal';
import {Header} from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../../constants/routes';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header
        iconName={'chevron-small-left'}
        openDrawer={() => navigation.goBack()}
        title={'Edit Profile'}
      />

      <View style={styles.editPhotoContainer}>
        <Image source={IMAGES.ProfilePicture} style={styles.profilePicture} />
        <View style={styles.editContainer}>
          <TouchableOpacity style={styles.editProfileContainer}>
            <Text style={styles.editProfileText}>Edit Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.editValueContainer}>
        <EditProfileComp
          title={'Name'}
          titleText={'John Doe'}
          // editValue={<EditModal />}
        />
        <EditProfileComp title={'Email'} titleText={'johndoe@gmail.com'} />
        <EditProfileComp title={'Password'} titleText={'*******'} />
        <EditProfileComp title={'Number'} titleText={'+91-1234567890'} />
      </View>
      <View style={styles.forgotPasswordContainer}>
        <Text>Forgot Password</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}>
          <Image
            source={IMAGES.rightArrow}
            resizeMode="contain"
            style={styles.rightArrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profilePicture: {
    height: 120,
    width: 120,
    // borderRadius: 40,
    marginTop: 20,
    alignSelf: 'center',
  },
  editContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  editProfileContainer: {
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: COLORS.lightTextColor,
    borderWidth: 1,
  },
  editProfileText: {
    fontFamily: FONTS.lightText,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: Platform.OS === 'android' ? '800' : '600',
    color: COLORS.mediumTextColor,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  rightArrow: {
    height: 16,
    width: 16,
  },
});

export default EditProfileScreen;
