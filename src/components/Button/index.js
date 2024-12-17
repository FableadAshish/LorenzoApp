import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import EStyleSheet from 'react-native-extended-stylesheet';

const Button = ({title, performAction, style, innerStyle, styleText}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.buttonContainer, innerStyle]}
        activeOpacity={0.8}
        onPress={performAction}>
        <Text style={[styles.buttonText, styleText]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20rem',
  },
  buttonContainer: {
    height: '50rem',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15rem',
    backgroundColor: COLORS.appColor,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: '20rem',
  },
});
export default Button;
