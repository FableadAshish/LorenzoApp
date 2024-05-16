import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {COLORS, COMMOM, FONTS, IMAGES} from '../../../constants';
import InputField from '../../../components/InputField';
import {Header} from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';
import {ROUTES} from '../../../constants/routes';

const ForgetPasswordScreen = () => {
  const navigation = useNavigation();
  const forgetPasswordButton = () => {
    navigation.navigate(ROUTES.OTP_SCREEN);
  };
  return (
    <>
      <View style={styles.container}>
        <Header
          iconName={'chevron-small-left'}
          openDrawer={() => navigation.goBack()}
        />
        <View style={styles.imageContainer}>
          <Image
            source={IMAGES.ForgotPassword}
            style={styles.forgetPasswordImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.message}>
          Don't worry it happens, please enter the address, associated with your
          account
        </Text>
        <View style={styles.textContainer}>
          <InputField
            placeholderText={'Email ID / Mobile Number'}
            placeholderImage={IMAGES.AtTheRate}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'Continue'}
          innerStyle={styles.buttonStyle}
          performAction={() => forgetPasswordButton()}
        />
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
  forgetPasswordImage: {
    height: 250,
    width: 250,
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
    backgroundColor: COLORS.white,
  },
  buttonStyle: {
    borderRadius: 50,
  },
});
export default ForgetPasswordScreen;
