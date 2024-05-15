import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {COLORS, COMMOM, FONTS, IMAGES} from '../../../constants';
import ProfileList from '../../../components/Profile';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../constants/routes';
import EditModal from '../../../components/EditModal';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.userDataContainer}>
          <Image source={IMAGES.ProfilePicture} style={styles.profilePicture} />
          <View style={styles.dataContainer}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>johndoe@gmail.com</Text>
          </View>
        </View>
        <View style={styles.profileList}>
          <Text style={styles.preferencesText}>General</Text>
          <View style={{marginTop: -30}}>
            <ProfileList
              leftIcon={IMAGES.ProfileIcon}
              title={'Edit Profile'}
              rightIcon={IMAGES.rightArrow}
              navigateTo={() => navigation.navigate(ROUTES.EDIT_PROFILE)}
            />
            <ProfileList
              leftIcon={IMAGES.language}
              title={'Language'}
              rightIcon={IMAGES.rightArrow}
            />
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.preferencesText}>Preferences</Text>
          <View style={{marginTop: -30}}>
            <ProfileList
              leftIcon={IMAGES.shield}
              title={'Legal & Policies'}
              rightIcon={IMAGES.rightArrow}
            />
            <ProfileList
              leftIcon={IMAGES.HelpandSupport}
              title={'Help & Support'}
              rightIcon={IMAGES.rightArrow}
            />
            <ProfileList
              leftIcon={IMAGES.logout}
              title={'Logout'}
              rightIcon={IMAGES.rightArrow}
            />
          </View>
        </View>
      </View>
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
    // borderRadius: 40,
    marginTop: 20,
    alignSelf: 'center',
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
});

export default ProfileScreen;
