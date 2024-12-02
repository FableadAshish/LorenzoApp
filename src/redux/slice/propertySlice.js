import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL, TOKEN} from '../../config';

const initialState = {
  propertyList: '',
  loading: false,
  error: '',
};

export const getAllProperties = createAsyncThunk('allProperties', async () => {
  try {
    const response = await axios.get(`${BASE_URL}/propertyList`, {
      headers: {
        Authorization: TOKEN,
      },
    });

    return response.data.result;
  } catch (error) {
    console.log('err', error);
  }
});

const propertySlice = createSlice({
  name: 'propertySlice',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(getAllProperties.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAllProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.propertyList = action.payload;
    });
    builder.addCase(getAllProperties.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default propertySlice.reducer;
