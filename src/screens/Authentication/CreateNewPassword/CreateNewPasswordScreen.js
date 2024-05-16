import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {COLORS, COMMOM, FONTS, IMAGES} from '../../../constants';
import InputField from '../../../components/InputField';
import {Header} from '../../../components/Header';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';
import {ROUTES} from '../../../constants/routes';

const CreateNewPasswordScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.contianer}>
        <Header
          iconName={'chevron-small-left'}
          openDrawer={() => navigation.goBack()}
        />
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.detailsText}>
          Create new password for your account{' '}
        </Text>
        <View style={styles.fieldsContainer}>
          <InputField
            title={'New Password'}
            placeholderText={'Add New Password'}
            placeholderImage={IMAGES.lock}
            secureTextEntry={true}
          />
          <InputField
            title={'Confirm New Password'}
            placeholderText={'Confirm New Password'}
            placeholderImage={IMAGES.lock}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'Continue'}
          innerStyle={styles.buttonStyles}
          performAction={() => navigation.navigate(ROUTES.HOME)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  title: {
    fontSize: 25,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.mediumTextColor,
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
    borderRadius: 50,
  },
  buttonContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: COMMOM.paddingHorizantal,
    paddingBottom: COMMOM.paddingHorizantal,
  },
  fieldsContainer: {
    marginTop: 30,
  },
});

export default CreateNewPasswordScreen;
