import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/Navigation/AuthNavigator';
import {SafeAreaView, StatusBar} from 'react-native';
import {COLORS} from './src/constants';

function App() {
  return (
    <>
      <StatusBar backgroundColor={COLORS.white} />
      <SafeAreaView />
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </>
  );
}

export default App;
