import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../../constants';
import InputField from '../InputField';

const AuthComp = ({headerTitle, headerSubTitle}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>{headerTitle}</Text>
        <Text>{headerSubTitle}</Text>
      </View>
      <View style={styles.fieldsContainer}>
        <InputField placeholderText="Enter Name" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default AuthComp;
