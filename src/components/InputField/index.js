import React from 'react';
import { TextInput, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, IMAGES } from '../../constants';

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

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: COLORS.lightTextColor,
    borderRadius: 50,
    backgroundColor: COLORS.placeholderBackgroundColor,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // position: 'relative', // Required for absolute positioning of rightIcon
  },
  fieldContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    letterSpacing: 0.4,
    color: COLORS.black,
    fontFamily: FONTS.poppinsRegular,
  },
  iconStyle: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  inputFieldText: {
    fontSize: 17,
    fontFamily: FONTS.poppinsRegular,
    flex: 1,
    color: COLORS.black,
  },
  rightIcon: {
    height: 20,
    width: 20,
    // position: 'absolute',
    // right: 20, // Adjust as needed for proper spacing
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    marginLeft: 10,
    // textAlign: 'center'
  },
});

export default InputField;
