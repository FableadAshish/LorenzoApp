import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/Navigation/AuthNavigator';
import {SafeAreaView, StatusBar} from 'react-native';
import {COLORS} from './src/constants';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';

function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={COLORS.white} />
      <SafeAreaView />
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
