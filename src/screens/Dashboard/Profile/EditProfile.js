import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { COLORS, COMMOM, FONTS, IMAGES } from '../../../constants';
import Button from '../../../components/Button';
import EditModal from '../../../components/EditModal';
import { Header } from '../../../components/Header';
import EditProfileComp from '../../../components/EditProfile';
import { ROUTES } from '../../../constants/routes';
import { BASE_URL } from '../../../config';
import { useSelector } from 'react-redux';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [imagePath, setImagePath] = useState('');
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '***',
    number: '+91-1234567890',
  });

  const userProfile = useSelector(state => state.auth.loginData)

  const pickImages = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      writeTempFile: true,
      includeBase64: true,
      // cropping: true,
    }).then(image => {
      setImagePath(image.path);
    });
  };

  const handleChange = (name, value) => {
    setProfileData(prevValue => ({ ...prevValue, [name]: value }));
  };

  const updateProfile = async (profileData) => {
    const formData = new FormData();
    formData.append('username', profileData.name);
    formData.append('email', profileData.email);
    formData.append('phone', profileData.phone)
    formData.append('profile', {
      uri: imagePath,
      type: 'image/jpeg',
      name: 'profile_image.jpg',
    });
    try {
      const response = await fetch(`${BASE_URL}/updateUsers/${profileData.user.id}`)
    } catch (error) {
      
    }
  };

  return (
    <View style={styles.container}>
      <Header
        iconName={'chevron-small-left'}
        openDrawer={() => navigation.goBack()}
        title={'Edit Profile'}
      />

      <View style={styles.editPhotoContainer}>
        <Image source={imagePath ? { uri: imagePath } : IMAGES.ProfilePicture} style={styles.profilePicture} />
        <View style={styles.editContainer}>
          <TouchableOpacity style={styles.editProfileContainer} onPress={pickImages}>
            <Text style={styles.editProfileText}>Edit Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.editValueContainer}>
        <EditProfileComp
          title={'Name'}
          titleText={profileData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        <EditProfileComp
          title={'Email'}
          titleText={profileData.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        {/* <EditProfileComp
          title={'Password'}
          titleText={profileData.password}
          onChangeText={(text) => handleChange('password', text)}
        /> */}
        <EditProfileComp
          title={'Number'}
          titleText={profileData.number}
          onChangeText={(text) => handleChange('number', text)}
        />
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
      <Button title={'Submit'} style={styles.last} performAction={() => updateProfile(profileData)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: COMMOM.paddingHorizantal,
    justifyContent: 'space-between'

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
  },
  rightArrow: {
    height: 16,
    width: 16,
  },
  last: {
    // backgroundColor: COLORS.red,
    // padding: 15,
    borderRadius: 50,
    // marginTop: 40,
    paddingBottom: 20
  }
});

export default EditProfileScreen;
