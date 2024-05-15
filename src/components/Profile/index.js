import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, IMAGES} from '../../constants';

const ProfileList = ({leftIcon, title, rightIcon, navigateTo}) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameAndIcon}>
        <Image
          source={leftIcon}
          style={styles.iconStyle}
          tintColor={COLORS.mediumTextColor}
        />
        <Text style={styles.textTitle}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.navigateIcon} onPress={navigateTo}>
        <Image
          source={rightIcon}
          style={styles.rightArrowStyle}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30
  },
  iconStyle: {
    height: 22,
    width: 22,
  },
  rightArrowStyle: {
    height: 18,
    width: 18,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: FONTS.poppinsRegular,
    color: COLORS.mediumTextColor,
    marginLeft: 10,
    fontWeight: '400'
  },
  nameAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    // marginTop: 50,
  },
  navigateIcon: {
    // marginTop: 50,
  },
});
export default ProfileList;
