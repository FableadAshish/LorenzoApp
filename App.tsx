import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/Navigation/AuthNavigator';
import {SafeAreaView, StatusBar} from 'react-native';
import {COLORS} from './src/constants';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <StatusBar backgroundColor={COLORS.white} />
      <SafeAreaView />
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>

      </PersistGate>
    </Provider>
  );
}

export default App;
