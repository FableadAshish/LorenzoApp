import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { COLORS, COMMOM, FONTS, IMAGES } from '../../../constants';
import InputField from '../../../components/InputField';
import { Header } from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import Button from '../../../components/Button';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../../../config';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreateNewPasswordScreen = () => {
  const navigation = useNavigation();
  const userProfile = useSelector(state => state.auth.loginData)
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (name, text) => {
    setPasswordData(prevData => ({ ...prevData, [name]: text }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (passwordData.old_password == '') {
      newErrors.old_password = 'Old password is required';
      isValid = false;
    }

    if (!passwordData.new_password) {
      newErrors.new_password = 'New password is required';
      isValid = false;
    } else if (passwordData.new_password.length <= 8) {
      newErrors.new_password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    if (!passwordData.confirm_password) {
      newErrors.confirm_password = 'Please confirm your new password';
      isValid = false;
    } else if (passwordData.new_password !== passwordData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const changePassword = async () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append('old_password', passwordData.old_password)
      formData.append('new_password', passwordData.new_password)
      console.log('formData', formData)
      try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL}/changePassword/${userProfile.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: TOKEN
          }
        })
        console.log('Password changed successfully:', response.data);
        navigation.goBack();
        setLoading(false)
        Toast.show('Password changed successfully')
      } catch (error) {
        // Handle error
        console.error('Error changing password:', error.response.data.message);
        if (error.response.data.message == 'Incorrect old password') {
          setErrorMessage('The old password you entered is incorrect. Please try again')
          setLoading(false)
        }
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Header iconName={'chevron-small-left'} openDrawer={() => navigation.goBack()} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.detailsText}>
            Change password for your account{' '}
          </Text>
        </View>
        <View style={styles.fieldsContainer}>
          <InputField
            title={'Old password'}
            placeholderText={'Add old password'}
            placeholderImage={IMAGES.lock}
            secureTextEntry={!showPassword.old_password}
            getText={text => handleChange('old_password', text)}
            rightIcon={showPassword.old_password ? IMAGES.visible : IMAGES.hide}
            showHide={() => togglePasswordVisibility('old_password')}
            errorMessage={errors.old_password}
          />
          <InputField
            title={'New password'}
            placeholderText={'Add new password'}
            placeholderImage={IMAGES.lock}
            secureTextEntry={!showPassword.new_password}
            getText={text => handleChange('new_password', text)}
            rightIcon={showPassword.new_password ? IMAGES.visible : IMAGES.hide}
            showHide={() => togglePasswordVisibility('new_password')}
            errorMessage={errors.new_password}
          />
          <InputField
            title={'Confirm new password'}
            placeholderText={'Confirm new password'}
            placeholderImage={IMAGES.lock}
            secureTextEntry={!showPassword.confirm_password}
            getText={text => handleChange('confirm_password', text)}
            rightIcon={showPassword.confirm_password ? IMAGES.visible : IMAGES.hide}
            showHide={() => togglePasswordVisibility('confirm_password')}
            errorMessage={errors.confirm_password}
          />
        </View>
        <Text style={styles.error}>{errorMessage}</Text>
        <Button
          title={ loading ? <ActivityIndicator color={COLORS.white}  size={20} /> : 'Change Password'}
          performAction={changePassword}
        />
      {/* <View style={styles.buttonContainer}>
      </View> */}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  title: {
    fontSize: 25,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.appColor,
    marginTop: 20,
    fontWeight: Platform.OS === 'ios' ? '400' : '600',
  },
  detailsText: {
    fontSize: 16,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.lightTextColor,
    // marginTop: 5,
    letterSpacing: 0.5,
    fontWeight: Platform.OS === 'ios' ? '400' : '600',
  },
  buttonStyles: {
    // borderRadius: 15,
  },
  buttonContainer: {
    backgroundColor: COLORS.white,
    marginTop: -20
  },
  fieldsContainer: {
    marginTop: 30,
  },
  titleContainer: {
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 25,
    // marginLeft: 10,
    textAlign: 'center'
  }
});

export default CreateNewPasswordScreen;
