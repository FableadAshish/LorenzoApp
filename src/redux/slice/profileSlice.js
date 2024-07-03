import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, TOKEN } from "../../config";

const initialState = {
  userProfileData:[],
  loading: '',
  errors: '',
}

export const getUsersData = createAsyncThunk('userProfile', async(userID)=> {
  try {
    const response = await axios.get(`${BASE_URL}/usersDets/${userID}`,{
      headers:{
        Authorization: TOKEN
      }
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
})
export const userProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers:{
    setUserProfileData: (state, action)=>{
      state.userProfileData = action.payload
    }
  },
  extraReducers: builder =>{
    builder.addCase(getUsersData.pending, state => {
      state.loading = true
    });
    builder.addCase(getUsersData.fulfilled, (state, action)=> {
      state.loading = false;
      state.userProfileData = action.payload
    })
    builder.addCase(getUsersData.rejected, (state)=>{
      state.loading = false;
    })
  }
})

export const { setUserProfileData } = userProfileSlice.actions; 

export default userProfileSlice.reducer;
