import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {COLORS, COMMOM, IMAGES} from '../../../constants';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import {ROUTES} from '../../../constants/routes';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const navigateToSignUp = () => {
    navigation.navigate(ROUTES.SIGNUP);
  };

  const LogIn = () => {
    navigation.navigate(ROUTES.HOME);
  };
  return (
    <>
      <SafeAreaView style={{backgroundColor: 'white'}} />
      <View style={styles.container}>
        {/* <Header /> */}
        <View style={styles.imageContainer}>
          <Image source={IMAGES.LogIn} style={styles.logInImage} />
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
            title={'EMAIL ID'}
            placeholderImage={IMAGES.Message}
          />
          <InputField
            placeholderText="Enter Password"
            title={'PASSWORD'}
            placeholderImage={IMAGES.lock}
          />
        </View>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <View style={styles.buttonContainer}>
          <Button title={'Sign In'} performAction={() => LogIn()} />
        </View>
        <View style={styles.noAccountContainer}>
          <Text style={styles.noAccountTitle}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigateToSignUp()}>
            <Text style={styles.toSignUp}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.socialMediaContainer}>
          <Text style={styles.socialMediaContainerTitle}>Or connect</Text>
          <View style={styles.socialIcons}>
            <Image source={IMAGES.Instagram} style={styles.socialIconsStyle} />
            <Image source={IMAGES.Twitter} style={styles.socialIconsStyle} />
            <Image source={IMAGES.Facebook} style={styles.socialIconsStyle} />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  logInImage: {
    height: 250,
    width: 250,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  fieldsContainer: {
    marginTop: 20,
  },
  titleHeader: {
    fontSize: 30,
    textAlign: 'center',
    color: COLORS.black,
    fontWeight: '600',
    marginTop: 30,
  },
  titleSubHeader: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.lightTextColor,
    marginTop: 15,
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: 15,
    color: COLORS.lightPrimaryColor,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    marginTop: 10,
  },
  noAccountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  noAccountTitle: {
    fontSize: 15,
    letterSpacing: 0.4,
    fontWeight: '400',
    color: COLORS.black,
    // marginRight: 10
  },
  toSignUp: {
    fontSize: 18,
    letterSpacing: 0.4,
    fontWeight: '400',
    color: COLORS.lightPrimaryColor,
    // marginLeft: 10
  },
  socialMediaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  socialMediaContainerTitle: {
    fontSize: 20,
    letterSpacing: 0.4,
    fontWeight: '400',
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 20,
    // marginRight: 10
  },
  socialIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    marginTop: 50,
  },
  socialIconsStyle: {
    height: 50,
    width: 50,
  },
});
export default LoginScreen;
