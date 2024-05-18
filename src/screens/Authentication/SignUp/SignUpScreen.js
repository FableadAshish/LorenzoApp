import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {COLORS, COMMOM, FONTS, IMAGES} from '../../../constants';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../../constants/routes';

const SignUpScreen = () => {
  const navigation = useNavigation();
  // const [userData, setUserData] = useState();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [confirm_passwordErrorMessage, setConfirm_passwordErrorMessage] = useState('');
  const navigateToLogIn = () => {
    navigation.navigate(ROUTES.LOGIN);
  };

  const validation = (fullName, email, password, confirm_password) => {
    if (/^\d+$/g.test(fullName)) {
      setNameErrorMessage('Full Name cannot include numbers');
      return;
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      setEmailErrorMessage('Please enter a valid Email address');
      return;
    }
    if (password.length < 6) {
      setPasswordErrorMessage('Password must be at least 6 characters');
      return;
    }

    if (password !== confirm_password) {
      setConfirm_passwordErrorMessage('Passwords do not match');
      return;
    }
  };
  const LogIn = () => {
    // validation(fullName, email, password, confirm_password);
    // console.log(fullName, email, password, confirm_password);
    navigation.navigate(ROUTES.LOGIN);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{marginTop: 20}}>
          <Text style={styles.title}>Let's get Started</Text>
          <Text style={styles.subTitle}>Create an Account for Lorenzo App</Text>
        </View>
        <ScrollView>
          <View style={styles.fieldsContainer}>
            <InputField
              title={'Full Name'}
              placeholderText={'Enter Full Name'}
              placeholderImage={IMAGES.userPlaceholder}
              getText={text => setFullName(text)}
              value={fullName}
            />
            <InputField
              title={'Email'}
              placeholderText={'Enter Email'}
              placeholderImage={IMAGES.Message}
              getText={text => setEmail(text)}
              value={email}
            />
            <InputField
              title={'Password'}
              placeholderText={'Enter Password'}
              placeholderImage={IMAGES.lock}
              getText={text => setPassword(text)}
              value={password}
              secureTextEntry={true}
            />
            <InputField
              title={'Confirm Password'}
              placeholderText={'Confirm Password'}
              placeholderImage={IMAGES.lock}
              getText={text => setConfirmPassword(text)}
              value={confirm_password}
              secureTextEntry={true}
            />
          </View>
        </ScrollView>
      </View>
      <View style={{backgroundColor: 'white'}}>
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
          style={styles.backImage}>
          <View style={styles.buttonContainer}>
            <Button
              title={'Sign Up'}
              performAction={() => LogIn()}
              innerStyle={styles.buttonStyles}
              styleText={styles.buttonText}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerImageContainer: {
    // width: 200,
    // height: 240,
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
    // paddingBottom: COMMOM.paddingHorizantal,
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
    // alignItems: 'center',
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
});
export default SignUpScreen;
