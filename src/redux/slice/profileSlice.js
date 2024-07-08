import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, TOKEN } from "../../config";

const initialState = {
  userProfileData: null,
  loading: 'idle',
  error: null,
};



// Define the async thunk
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/usersDets/${userID}`, {
        headers: {
          Authorization: TOKEN
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
export const userProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.userProfileData = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      });
  },
});

export const { setUserProfileData } = userProfileSlice.actions;

export default userProfileSlice.reducer;
