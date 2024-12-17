import React from 'react';
import { TextInput, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, IMAGES } from '../../constants';
import EStyleSheet from 'react-native-extended-stylesheet';

const InputField = ({
  placeholderText,
  title,
  placeholderImage,
  getText,
  value,
  secureTextEntry,
  style,
  errorMessage,
  rightIcon,
  showHide,
}) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.input, style]}>
        <Image
          resizeMode="contain"
          source={placeholderImage}
          style={styles.iconStyle}
          tintColor={COLORS.placeholderIconColor}
        />
        <TextInput
          placeholder={placeholderText}
          style={styles.inputFieldText}
          placeholderTextColor={COLORS.lightTextColor}
          onChangeText={getText}
          value={value}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity onPress={showHide}>
          <Image
            resizeMode="contain"
            source={rightIcon}
            style={styles.rightIcon}
            tintColor={COLORS.placeholderIconColor}
          />
        </TouchableOpacity>
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = EStyleSheet.create({
  input: {
    height: '50rem',
    borderColor: COLORS.lightTextColor,
    borderRadius: '50rem',
    backgroundColor: COLORS.placeholderBackgroundColor,
    paddingLeft: '20rem',
    paddingRight: '20rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldContainer: {
    marginTop: '20rem',
  },
  title: {
    fontSize: '18rem',
    letterSpacing: 0.4,
    color: COLORS.black,
    fontFamily: FONTS.poppinsRegular,
  },
  iconStyle: {
    height: '20rem',
    width: '20rem',
    marginRight: '10rem',
  },
  inputFieldText: {
    fontSize: '17rem',
    fontFamily: FONTS.poppinsRegular,
    flex: 1,
    color: COLORS.black,
  },
  rightIcon: {
    height: '20rem',
    width: '20rem',
    // position: 'absolute',
    // right: 20, // Adjust as needed for proper spacing
  },
  errorText: {
    color: 'red',
    fontSize: '14rem',
    marginTop: '10rem',
    marginLeft: '10rem',
    // textAlign: 'center'
  },
});

export default InputField;
