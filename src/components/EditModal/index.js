import React, {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, COMMOM, FONTS, IMAGES} from '../../constants';
import InputField from '../InputField';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../constants/routes';

const EditModal = ({title, closeModal, inputField, button, forgetPassword}) => {
  const navigation = useNavigation();
  return (
    <View style={{paddingHorizontal: 20}}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Image
              source={IMAGES.close}
              style={styles.closeImage}
              tintColor={COLORS.mediumTextColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.placeholderContainer}>{inputField}</View>
        {forgetPassword && (
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}>
            <Text style={styles.forgetPassword}>{forgetPassword}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.buttonContainer}>{button}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: COMMOM.paddingHorizantal,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
  },
  titleText: {
    fontSize: 18,
    color: COLORS.mediumTextColor,
    fontFamily: FONTS.poppinsRegular,
  },
  closeImage: {
    height: 30,
    width: 30,
  },
  forgetPassword: {
    textAlign: 'right',
    // marginTop: 10,
    textDecorationLine: 'underline',
    padding: 5,
  },
  placeholderContainer: {marginTop: 0},
  buttonContainer: {marginTop: 10},
});

export default EditModal;
