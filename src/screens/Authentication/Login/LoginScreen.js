import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {COLORS, COMMOM, FONTS, IMAGES} from '../../../constants';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import {ROUTES} from '../../../constants/routes';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {loginData, userLogin} from '../../../redux/slice/authSlice';
import axios from 'axios';
import {BASE_URL, TOKEN} from '../../../config';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState('');
  const [alredyLoggedIn, setAlreadyLoggedIn] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigateToSignUp = () => {
    navigation.navigate(ROUTES.SIGNUP);
  };

  const validation = (email, password) => {
    let isValid = true;
    // Email validation
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    // Password validation
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    return isValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const LogIn = async data => {
    if (validation(data.email, data.password)) {
      const loginForm = new FormData();
      loginForm.append('email', data.email);
      loginForm.append('password', data.password);
      try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL}/login`, loginForm, {
          headers: {
            Authorization: TOKEN,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);

        if (response.data.message === 'Login successful') {
          dispatch(loginData(response.data.user));
          navigation.navigate(ROUTES.HOME);
          setLoading(false);
        } else if (response.data.message === 'User not registered') {
          setAlreadyLoggedIn('No such user found, please register');
          setLoading(false);
        } else if (response.data.message === 'Login unsuccessful') {
          setAlreadyLoggedIn('You have entered wrong email or password');
          setLoading(false);
        } else if (response.data.message === 'Invalid email or password') {
          setAlreadyLoggedIn('You have entered wrong email or password');
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (name, value) => {
    setFormData(prevValue => ({...prevValue, [name]: value}));
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={{paddingHorizontal: COMMOM.paddingHorizantal}}>
          <View style={styles.imageContainer}>
            <Image source={IMAGES.APP_ICON} style={styles.logInImage} />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.titleHeader}>Sign in now</Text>
            <Text style={styles.titleSubHeader}>
              Please sign in to continue our app
            </Text>
          </View>
          <View style={styles.fieldsContainer}>
            <InputField
              placeholderText="Enter Email"
              title={'Email Address'}
              placeholderImage={IMAGES.Message}
              getText={text => handleChange('email', text)}
            />
            {emailError ? (
              <Text style={styles.errorTexts}>{emailError}</Text>
            ) : null}
            <InputField
              placeholderText="Enter Password"
              title={'Password'}
              placeholderImage={IMAGES.lock}
              getText={text => handleChange('password', text)}
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? IMAGES.visible : IMAGES.hide}
              showHide={togglePasswordVisibility}
            />
            {passwordError ? (
              <Text style={styles.errorTexts}>{passwordError}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        {alredyLoggedIn && (
          <Text style={styles.errorText}>{alredyLoggedIn}</Text>
        )}
        <View style={styles.backImageContainer}>
          <View
            source={IMAGES.AuthRectangle}
            style={styles.backImage}
            resizeMode="stretch">
            <View style={styles.buttonContainer}>
              <Button
                title={
                  loading ? (
                    <ActivityIndicator size={20} color={COLORS.white} />
                  ) : (
                    'Sign In'
                  )
                }
                performAction={() => LogIn(formData)}
                innerStyle={styles.buttonStyles}
                styleText={styles.buttonText}
              />
            </View>
            <View style={styles.noAccountContainer}>
              <Text style={styles.noAccountTitle}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigateToSignUp()}>
                <Text style={styles.toSignUp}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
    justifyContent: 'space-between',
  },
  logInImage: {
    height: 165,
    width: 165,
    borderRadius: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  fieldsContainer: {
    marginTop: 10,
  },
  headerContainer: {
    marginTop: 10,
  },
  titleHeader: {
    fontSize: 30,
    textAlign: 'center',
    color: COLORS.appColor,
  },
  titleSubHeader: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.black,
    fontFamily: FONTS.poppinsRegular,
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: 15,
    color: COLORS.appColor,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    width: '90%',
  },
  noAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  noAccountTitle: {
    color: COLORS.appColor,
    fontSize: 16,
    fontFamily: FONTS.lightText,
  },
  toSignUp: {
    fontSize: 18,
    letterSpacing: 0.4,
    fontWeight: '400',
    color: COLORS.appColor,
    textDecorationLine: 'underline',
  },
  buttonStyles: {
    backgroundColor: COLORS.appColor,
    borderRadius: 50,
    height: 50,
  },
  buttonText: {
    color: COLORS.buttonAuthCommonText,
    fontSize: 22,
    fontFamily: FONTS.poppinsRegular,
  },
  backImage: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vectorImage: {
    height: 200,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImageContainer: {
    backgroundColor: COLORS.bgColor,
    marginTop: 10,
  },
  authImageContainer: {
    alignItems: 'center',
  },
  authImage: {
    height: 50,
    width: 50,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    paddingHorizontal: COMMOM.paddingHorizantal,
    backgroundColor: COLORS.bgColor,
    paddingTop: 15,
    textAlign: 'center',
    fontFamily: FONTS.poppinsRegular,
  },
  errorTexts: {
    color: 'red',
    fontSize: 14,
    backgroundColor: COLORS.bgColor,
    paddingTop: 10,
    fontFamily: FONTS.poppinsRegular
  },
});

export default LoginScreen;
