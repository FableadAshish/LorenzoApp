import React from 'react';
import {
  SafeAreaView,
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
      <View style={styles.container}>
        <View style={{paddingHorizontal: COMMOM.paddingHorizantal}}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={IMAGES.BackImage}
              resizeMode="contain"
              style={styles.vectorImage}>
              <Image source={IMAGES.LogIn} style={styles.logInImage} />
            </ImageBackground>
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
            />
            <InputField
              placeholderText="Enter Password"
              title={'Password'}
              placeholderImage={IMAGES.lock}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.backImageContainer}>
          <View style={styles.authImageContainer}>
            <Image
              resizeMode="contain"
              source={IMAGES.authImage}
              style={styles.authImage}
            />
          </View>
          <ImageBackground
            source={IMAGES.AuthRectangle}
            style={styles.backImage}
            resizeMode="stretch">
            <View style={styles.buttonContainer}>
              <Button
                title={'Sign In'}
                performAction={() => LogIn()}
                innerStyle={styles.buttonStyles}
                styleText={styles.buttonText}
              />
            </View>
            <View style={styles.noAccountContainer}>
              <Text style={styles.noAccountTitle}>Don’t have an account?</Text>
              <TouchableOpacity onPress={() => navigateToSignUp()}>
                <Text style={styles.toSignUp}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
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
  logInImage: {
    height: 165,
    width: 165,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  fieldsContainer: {
    marginTop: 10,
  },
  titleHeader: {
    fontSize: 30,
    textAlign: 'center',
    color: COLORS.black,
    // fontWeight: '600',
    // marginTop: 20,
  },
  titleSubHeader: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.lightTextColor,
    // marginTop: 10,
    fontFamily: FONTS.poppinsRegular,
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: 15,
    color: COLORS.lightPrimaryColor,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    // marginTop: -50,
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
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.lightText,
    // marginRight: 10
  },
  toSignUp: {
    fontSize: 18,
    letterSpacing: 0.4,
    fontWeight: '400',
    color: COLORS.buttonAuthCommon,
    textDecorationLine: 'underline',
    // marginLeft: 10
  },
  buttonStyles: {
    backgroundColor: COLORS.buttonAuthCommon,
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
    backgroundColor: 'white',
    marginTop: 10,
  },
  authImageContainer: {
    alignItems: 'center',
  },
  authImage: {
    height: 50,
    width: 50,
  },
});
export default LoginScreen;
