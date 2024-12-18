import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { COLORS, COMMOM, FONTS, IMAGES } from '../../../constants';
import InputField from '../../../components/InputField';
import { Header } from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import Button from '../../../components/Button';
import { ROUTES } from '../../../constants/routes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../../../config';
import { useSelector } from 'react-redux';

const ForgetPasswordScreen = () => {
  const navigation = useNavigation();
  const userProfile = useSelector(state => state.auth.loginData);
  const [email, setEmail] = useState('');
  const [emailSend, setEmailSend] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userProfile && userProfile.email) {
      setEmail(userProfile.email);
    }
  }, [userProfile]);

  const forgetPasswordButton = async (email) => {
    const formData = new FormData();
    formData.append('email', email);
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/forgotPassword`, formData, {
        headers: {
          'Authorization': TOKEN,
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoading(false);
      setEmailSend('A new password has been shared with your email address')
      navigation.navigate(navigation.goBack());
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Header
          iconName={'chevron-small-left'}
          openDrawer={() => navigation.goBack()}
        />
        <View style={styles.imageContainer}>
          <Image
            source={IMAGES.APP_ICON}
            style={styles.forgetPasswordImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.message}>
          Don't worry it happens, please enter the address associated with your
          account
        </Text>
        <View style={styles.textContainer}>
          <InputField
            placeholderText={'Enter registered email-Id'}
            placeholderImage={IMAGES.AtTheRate}
            // value={email}
            getText={(text) => setEmail(text)}
          />
        </View>
        {emailSend && <Text>{emailSend}</Text>}
        {error && <Text style={styles.errorMessage}>{'No such user found, enter correct email !!'}</Text>}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? <ActivityIndicator size={22} color={'white'} /> : 'Submit'}
          innerStyle={styles.buttonStyle}
          performAction={() => forgetPasswordButton(email)}
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
  },
  forgetPasswordImage: {
    height: 250,
    width: 250,
    borderRadius: 10
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    color: COLORS.mediumTextColor,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: FONTS.poppinsRegular,
  },
  buttonContainer: {
    paddingHorizontal: COMMOM.paddingHorizantal,
    paddingBottom: COMMOM.paddingHorizantal,
    backgroundColor:COLORS.bgColor,
  },
  buttonStyle: {
    borderRadius: 50,
  },
  errorMessage: {
    color: COLORS.red,
    fontSize: 14,
    // marginBottom: 10,
    textAlign: 'center',
    fontFamily: FONTS.poppinsRegular,
    marginTop: 25,
  }
});

export default ForgetPasswordScreen;
