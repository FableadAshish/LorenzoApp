import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import userProfileReducer from '../slice/profileSlice';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  // whitelist: ['auth']
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    profile: userProfileReducer,
  },
});

export const persistor = persistStore(store);