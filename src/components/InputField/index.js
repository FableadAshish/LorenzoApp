import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import { COLORS } from '../../constants';

const InputField = ({placeholderText}) => {
  return (
    <View style={styles.input}>
      <TextInput placeholder={placeholderText} placeholderTextColor={'black'} />
    </View>
  )
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    borderColor: COLORS.lightTextColor,
    borderRadius: 10,
    color: 'black',
    marginTop: 20,
    backgroundColor: COLORS.placeholderColor,
    justifyContent: 'center',
    paddingLeft: 20
  }
})
export default InputField;
