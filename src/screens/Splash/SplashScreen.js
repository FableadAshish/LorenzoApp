import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../constants/routes';
import { COLORS, FONTS } from '../../constants';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(ROUTES.SIGNUP);
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>LORENZO</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 30,
    color: COLORS.black,
    fontWeight: '500',
    fontFamily: FONTS.lightText,
  },
});

export default SplashScreen;
