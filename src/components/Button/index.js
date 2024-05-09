import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const Button = ({title, performAction, style, innerStyle}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.buttonContainer, innerStyle]}
        activeOpacity={0.8}
        onPress={performAction}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: COLORS.lightPrimaryColor,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
  },
});
export default Button;