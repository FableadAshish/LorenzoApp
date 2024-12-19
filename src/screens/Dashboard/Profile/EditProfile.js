import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {COLORS, COMMOM, FONTS, IMAGES} from '../../../constants';
import Button from '../../../components/Button';
import EditModal from '../../../components/EditModal';
import {Header} from '../../../components/Header';
import EditProfileComp from '../../../components/EditProfile';
import {ROUTES} from '../../../constants/routes';
import {BASE_URL, TOKEN} from '../../../config';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUserProfile} from '../../../redux/slice/profileSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [imagePath, setImagePath] = useState('');
  const [error, setErrors] = useState({});
  const userProfile = useSelector(state => state.auth.loginData);
  const dispatch = useDispatch();
  let userProfileData = useSelector(
    state => state.profile?.userProfileData?.user,
  );
  const isRequired = useSelector(state => state.property.isRequired);
  // console.log('isRequired', isRequired);
  const [loading, setLoading] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [profileData, setProfileData] = useState({
    name: userProfileData ? userProfileData.username : userProfile.username,
    email: userProfileData ? userProfileData.email : userProfile.email,
    number: userProfileData?.details?.phone ? userProfileData?.details?.phone : '---',
    dream_location: userProfileData?.details?.dream_location !== undefined
      ? userProfileData?.details?.dream_location
      : '----',
    requireWeddingPlanner: userProfileData?.details?.wedding_planner
      ? userProfileData?.details?.wedding_planner
      : '---',
  });
  
  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      dispatch(fetchUserProfile(userProfile.id));
    });
    return subscribe;
  }, []);

  useEffect(() => {
    if (userProfileData) {
      setNameValue(userProfileData.username);
      setEmailValue(userProfileData.email);
    }
  }, [userProfileData]);

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
    console.log(name)
    setProfileData(prevValue => ({...prevValue, [name]: value}));
    setErrors(prevErrors => ({...prevErrors, [name]: ''}));
  };

  const isValidate = () => {
    let isValid = true;
    const errors = {};

    if (!profileData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!profileData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    if (!profileData.number.trim()) {
      errors.number = 'Phone number is required';
      isValid = false;
    } else if (!/^\+?\d{1,15}$/.test(profileData.number)) {
      errors.number = 'Invalid phone number';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const updateProfile = async profileData => {
    if (isValidate()) {
      const formData = new FormData();
      formData.append('username', profileData.name);
      formData.append('email', profileData.email);
      formData.append('phone', profileData.number);
      formData.append('dream_location', profileData?.dream_location);
      formData.append('wedding_planner', isRequired);

      // console.log('formData', formData);
        if (imagePath) {
          formData.append('profile', {
            uri: imagePath,
            type: 'image/jpeg',
            name: 'profile_image.jpg',
          });
        }

        // console.log(formData);
        try {
          setLoading(true); 
          const response = await fetch(
            `${BASE_URL}/updateUsers/${userProfile.id}`,
            {
              method: 'POST',
              headers: {
                Authorization: TOKEN,
              },
              body: formData,
            },
          );
          const result = await response.json();
          console.log('Update successful:', result);
          navigation.goBack();
          setLoading(false);
        } catch (error) {
          console.log('error', error);
          setLoading(false);
        }
    }
  };

  return (
    <KeyboardAwareScrollView
    style={{flex: 1}}
    contentContainerStyle={{flexGrow: 1}}
    keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Header
          iconName={'chevron-small-left'}
          openDrawer={() => navigation.goBack()}
          title={'Edit Profile'}
          style={styles.header}
        />

        <View style={styles.editPhotoContainer}>
          <Image
            source={
              imagePath
                ? {uri: imagePath}
                : userProfileData && userProfileData.profile
                ? {uri: userProfileData.profile}
                : IMAGES.ProfilePicture
            }
            style={styles.profilePicture}
          />

          <View style={styles.editContainer}>
            <TouchableOpacity
              style={styles.editProfileContainer}
              onPress={pickImages}>
              <Text style={styles.editProfileText}>Edit Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Yes: 1, No: 0 */}
        <View style={styles.editValueContainer}>
          <EditProfileComp
            title={'Name'}
            titleText={profileData.name}
            onChangeText={text => handleChange('name', text)}
            defaultValue={userProfileData.username}
            error={error.name}
          />
          <EditProfileComp
            title={'Email'}
            titleText={profileData.email}
            onChangeText={text => handleChange('email', text)}
            error={error.email}
          />
          <EditProfileComp
            title={'Number'}
            titleText={profileData.number}
            onChangeText={text => handleChange('number', text)}
            error={error.number}
          />
          <EditProfileComp
            title={'Dream Location'}
            titleText={
              profileData?.dream_location
                ? profileData?.dream_location
                : '---'
            }
            onChangeText={text => handleChange('dream_location', text)}
            error={error.number}
          />
          <EditProfileComp
            title={'Require a Wedding Planner?'}
            titleText={isRequired === 1 || profileData?.requireWeddingPlanner === 1 ? 'Yes' : 'No'}
            onChangeText={text => handleChange('wedding_planner', text)}
            error={error.number}
            isRequired={profileData.requireWeddingPlanner}
          />
        </View>
        <View style={styles.separator} />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.forgotPasswordContainer}
          onPress={() => navigation.navigate(ROUTES.CREATE_NEW_PASSWORD)}>
          <View style={styles.leftContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={IMAGES.resetPassword}
                style={styles.resetPassword}
              />
            </View>
            <Text style={{color: COLORS.appColor, fontSize: 18}}>
              Change Password
            </Text>
          </View>
          <TouchableOpacity>
            <Image
              source={IMAGES.rightArrow}
              resizeMode="contain"
              style={styles.rightArrow}
              tintColor={COLORS.appColor}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: COLORS.bgColor, paddingHorizontal: 20}}>
        <Button
          title={
            loading ? (
              <ActivityIndicator size={20} color={COLORS.white} />
            ) : (
              'Submit'
            )
          }
          style={styles.last}
          performAction={() => updateProfile(profileData)}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: COMMOM.paddingHorizantal,
    // justifyContent: 'space-between'
  },
  profilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
    // marginTop: 20,
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
    marginTop: 10,
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
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
  },
  editPhotoContainer: {
    // marginBottom: -50
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 20,
  },
  resetPassword: {
    height: 28,
    width: 28,
    // marginBottom: 10
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  imageContainer: {
    backgroundColor: COLORS.logoBackGroundColor2,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default EditProfileScreen;
