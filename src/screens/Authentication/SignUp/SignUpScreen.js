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
import {Header} from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../../constants/routes';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const navigateToLogIn = () => {
    navigation.navigate(ROUTES.LOGIN);
  };
  const SignUp = () => {
    navigation.navigate(ROUTES.LOGIN);
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
          <Text style={styles.titleHeader}>Sign Up now</Text>
          <Text style={styles.titleSubHeader}>
            Please fill the details and create account
          </Text>
        </View>
        <View style={styles.fieldsContainer}>
          <InputField placeholderText="Enter Name" />
          <InputField placeholderText="Enter Email" />
          <InputField placeholderText="Enter Password" />
        </View>
        <Text style={styles.forgotPassword}>Password must be 8 character</Text>
        <View style={styles.buttonContainer}>
          <Button title={'Sign Up'} performAction={() => SignUp()} />
        </View>
        <View style={styles.noAccountContainer}>
          <Text style={styles.noAccountTitle}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigateToLogIn()}>
            <Text style={styles.toSignUp}>Sign In</Text>
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
  imageContainer:{
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
  },
  titleSubHeader: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.lightTextColor,
    marginTop: 15,
  },
  forgotPassword: {
    textAlign: 'left',
    marginTop: 15,
    color: COLORS.lightTextColor,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    marginTop: 20,
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
    marginTop: 50,
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
export default SignUpScreen;
