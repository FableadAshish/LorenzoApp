import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { COLORS, COMMOM, FONTS, IMAGES } from '../../../constants';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../constants/routes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BASE_URL, TOKEN } from '../../../config';
import axios from 'axios';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirm_passwordErrorMessage, setConfirm_passwordErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigateToLogIn = () => {
    navigation.navigate(ROUTES.LOGIN);
  };

  const data = {
    fullName,
    email,
    password,
    confirm_password,
  };

  const validation = (fullName, email, password, confirm_password) => {
    let isValid = true;

    if (/^\d+$/g.test(fullName)) {
      setNameErrorMessage('Full Name cannot include numbers');
      isValid = false;
    }

    if (fullName.length < 1) {
      setNameErrorMessage('Name is required');
      isValid = false;
    }

    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      setEmailErrorMessage('Please enter a valid Email address');
      isValid = false;
    }

    if (password.length <= 8) {
      setPasswordErrorMessage('Password must be at least 8 characters');
      isValid = false;
    }

    if (password !== confirm_password) {
      setConfirm_passwordErrorMessage('Passwords do not match');
      isValid = false;
    }

    return isValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const registerUser = async (data) => {
    const isValid = validation(data.fullName, data.email, data.password, data.confirm_password);
    if (isValid) {
      const registrationForm = new FormData();
      registrationForm.append('username', data.fullName);
      registrationForm.append('email', data.email);
      registrationForm.append('password', data.password);

      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/register`, registrationForm, {
          headers: {
            Authorization: TOKEN,
            'Content-Type': 'multipart/form-data',
          },
        });
        // console.log('response.data', response);
        setLoading(false);
        navigateToLogIn();
        setConfirmPassword('')
        setEmail('');
        setFullName('');
        setPassword('');
        setConfirm_passwordErrorMessage('');
        setError('');
      } catch (err) {
        console.log('error', err);
        setLoading(false);
        setError(err.response.data.message)
        setNameErrorMessage('');
        setEmailErrorMessage('');
        setConfirm_passwordErrorMessage('');
        setPasswordErrorMessage('');
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
        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>Let's get Started</Text>
          <Text style={styles.subTitle}>Create an Account for Lorenzo App</Text>
        </View>
        <View style={styles.fieldsContainer}>
          <InputField
            title={'Full Name'}
            placeholderText={'Enter Full Name'}
            placeholderImage={IMAGES.userPlaceholder}
            getText={text => setFullName(text)}
            value={fullName}
            errorMessage={nameErrorMessage}
          />
          <InputField
            title={'Email'}
            placeholderText={'Enter Email'}
            placeholderImage={IMAGES.Message}
            getText={text => setEmail(text)}
            value={email}
            errorMessage={emailErrorMessage}
          />
          {/* <InputField
            title={'Password'}
            placeholderText={'Enter Password'}
            placeholderImage={IMAGES.lock}
            getText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
            errorMessage={passwordErrorMessage}
          />
          <InputField
            title={'Confirm Password'}
            placeholderText={'Confirm Password'}
            placeholderImage={IMAGES.lock}
            getText={text => setConfirmPassword(text)}
            value={confirm_password}
            secureTextEntry={true}
            errorMessage={confirm_passwordErrorMessage}
          /> */}
          <InputField
            title={'Password'}
            placeholderText={'Enter Password'}
            placeholderImage={IMAGES.lock}
            getText={text => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
            errorMessage={passwordErrorMessage}
            rightIcon={showPassword ? IMAGES.visible : IMAGES.hide}
            showHide={togglePasswordVisibility}
          />
          <InputField
            title={'Confirm Password'}
            placeholderText={'Confirm Password'}
            placeholderImage={IMAGES.lock}
            getText={text => setConfirmPassword(text)}
            value={confirm_password}
            secureTextEntry={!showConfirmPassword}
            errorMessage={confirm_passwordErrorMessage}
            rightIcon={showConfirmPassword ? IMAGES.visible : IMAGES.hide}
            showHide={toggleConfirmPasswordVisibility}
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <View style={{ backgroundColor: 'white' }}>
        <View style={styles.authImageContainer}>
          <Image
            source={IMAGES.authImage}
            style={styles.authImage}
            resizeMode="contain"
          />
        </View>
        <ImageBackground
          resizeMode="stretch"
          source={IMAGES.AuthRectangle}
          style={styles.backImage}
        >
          <View style={styles.buttonContainer}>
            <Button
              title={loading ? <ActivityIndicator color={'black'} size={18} /> : 'Sign Up'}
              performAction={() => registerUser(data)}
              innerStyle={styles.buttonStyles}
              styleText={styles.buttonText}
              disabled={loading}
            />
          </View>
          <View style={styles.noAccountContainer}>
            <Text style={styles.noAccountTitle}>Already have account?</Text>
            <TouchableOpacity onPress={() => navigateToLogIn()}>
              <Text style={styles.toSignUp}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // justifyContent: 'space-between',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginVectorImage: {
    width: 180,
    height: 150,
  },
  titleText: {
    fontSize: 30,
    color: COLORS.buttonAuthCommonText,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  fieldsContainer: {
    paddingHorizontal: COMMOM.paddingHorizantal,
    marginTop: 20,
  },
  backImage: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyles: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.buttonAuthCommon,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonContainer: {
    width: '90%',
    borderRadius: 50,
  },
  buttonText: {
    color: COLORS.buttonAuthCommonText,
    fontSize: 22,
    fontFamily: FONTS.poppinsRegular,
  },
  noAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  noAccountTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.lightText,
  },
  toSignUp: {
    color: COLORS.buttonAuthCommon,
    fontSize: 16,
    fontFamily: FONTS.poppinsRegular,
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
  authImage: {
    height: 50,
    width: 50,
  },
  authImageContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    color: COLORS.buttonAuthCommonText,
    fontFamily: FONTS.lightText,
    marginTop: 10,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.lightTextColor,
    fontFamily: FONTS.poppinsRegular,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    // marginTop: 5,
    paddingHorizontal: COMMOM.paddingHorizantal,
    backgroundColor: 'white',
    paddingTop: 15,
    textAlign: 'center',
    fontFamily: FONTS.poppinsRegular
  }
});

export default SignUpScreen;
