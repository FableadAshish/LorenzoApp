import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../../config';
// import {ActionTypes} from '../action/actionTypes';

const initialState = {
  userLogin: [],
  userRegistered: '',
  loginData: '',
  loading: '',
  error: '',
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'LOGIN_USER',
  initialState,
  reducers: {
    userAuth: (state, payload) => {
      state.userLogin.push(payload);
    },
    loginData: (state, action) => {
      state.loginData = action.payload;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {userAuth, loginData, logout} = authSlice.actions;
export default authSlice.reducer;
