import React from 'react';
import {TextInput, StyleSheet, View, Text, Image} from 'react-native';
import {COLORS, IMAGES} from '../../constants';

const InputField = ({placeholderText, title, placeholderImage}) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.input}>
        <Image
          resizeMode="contain"
          source={placeholderImage}
          style={styles.iconStyle}
        />
        <TextInput
          placeholder={placeholderText}
          placeholderTextColor={COLORS.lightTextColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    borderColor: COLORS.lightTextColor,
    borderRadius: 10,
    color: 'black',
    marginTop: 5,
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
    fontSize: 15,
    letterSpacing: 0.4,
    fontWeight: '400',
    color: COLORS.black,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
});
export default InputField;
