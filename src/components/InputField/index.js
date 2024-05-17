import React from 'react';
import {TextInput, StyleSheet, View, Text, Image} from 'react-native';
import {COLORS, FONTS, IMAGES} from '../../constants';

const InputField = ({
  placeholderText,
  title,
  placeholderImage,
  getText,
  value,
  secureTextEntry,
  style,
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: COLORS.lightTextColor,
    borderRadius: 50,
    color: 'black',
    backgroundColor: COLORS.placeholderColor,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  },
  inputFieldText: {
    fontSize: 17,
    fontFamily: FONTS.poppinsRegular,
    width: '100%',
  },
});
export default InputField;
