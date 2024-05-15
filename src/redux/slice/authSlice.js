import {createSlice} from '@reduxjs/toolkit';
import {ActionTypes} from '../action/actionTypes';

const initialState = {
  userLogin: [],
};

export const authSlice = createSlice({
  name: ActionTypes.LOGIN_USER,
  initialState,
  reducers: {
    userAuth: (state, payload) => {
      state.userLogin.push(payload);
    },
  },
});

export const {userAuth} = authSlice.actions;
export default authSlice.reducer;
