import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL, TOKEN} from '../../config';

const initialState = {
  loading: false,
  propertyList: '',
  searchedList: '',
  searchedStateList: '',
  countries: '',
  state: '',
  error: '',
  hasMore: false,
};

export const getAllProperties = createAsyncThunk(
  'allProperties',
  async data => {
    // console.log('datadatadatadata', data);
    try {
      const response = await axios.get(
        `${BASE_URL}/propertyList/?page=${data.page}`,
        {
          headers: {
            Authorization: TOKEN,
          },
        },
      );
      return {
        properties: response.data.result,
        page: data.page,
      };
    } catch (error) {
      console.log('err', error);
    }
  },
);

export const getCountriesBySearch = createAsyncThunk(
  'getCountries',
  async country => {
    try {
      const getSearchedCountries = await axios.get(
        /*`${BASE_URL}/search?search_term=${searchValue}`*/
        `${BASE_URL}/search?search_term=${country}`,
        {
          headers: {
            Authorization: TOKEN,
          },
        },
      );
      if (country.length === 0) {
        return [];
      } else {
        return getSearchedCountries.data.result[0].properties;
      }
    } catch (error) {
      console.log('err', error.response.data.message);
    }
  },
);

export const getStatesBySearch = createAsyncThunk('getStates', async state => {
  try {
    const getSearchedCountries = await axios.get(
      /*`${BASE_URL}/search?search_term=${searchValue}`*/
      `${BASE_URL}/search?search_term=${state}`,
      {
        headers: {
          Authorization: TOKEN,
        },
      },
    );
    if (state.length === 0) {
      return [];
    } else {
      return getSearchedCountries.data.result[0].properties;
    }
  } catch (error) {
    console.log('err', error.response.data.message);
  }
});

export const getCountiresData = createAsyncThunk(
  'getCountriesData',
  async (data) => {
    try {
      // Create an array to store results for all selected countries
      const countriesData = [];

      // Iterate through each selected country
      for (const selectedCountry of data.selectedCountries) {
        const byLocationType = /*data.state ? data.state : */selectedCountry;
        console.log('byLocationType', byLocationType)
        // Make API call for each country
        const getSearchedCountries = await axios.get(
          `${BASE_URL}/search?search_term=${byLocationType}`,
          {
            headers: {
              Authorization: TOKEN,
            },
          }
        );

        // Store the result for this country
        countriesData.push({
          country: selectedCountry,
          searchedData: getSearchedCountries.data.result[0].properties
        });
      }

      return {
        searchedData: countriesData,
        type: data.type,
        selectedCountries: data.selectedCountries
      };
    } catch (error) {
      console.log('err', error.response?.data?.message);
      throw error;
    }
  }
);


const propertySlice = createSlice({
  name: 'propertySlice',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(getAllProperties.pending, state => {
      state.loading = true;
      state.hasMore = true;
    });
    builder.addCase(getAllProperties.fulfilled, (state, action) => {
      state.loading = false;
      const Offset = action.payload.page;

      if (Offset === 1) {
        state.propertyList = action.payload.properties;
        state.hasMore = false;
      } else if (state.propertyList.length === 0) {
        state.hasMore = true;
      } else {
        state.propertyList = [
          ...state.propertyList,
          ...action.payload.properties,
        ];
      }
    });
    builder.addCase(getAllProperties.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.hasMore = false;
    });

    // getCountriesBySearch
    builder.addCase(getCountriesBySearch.pending, state => {
      state.loading = true;
    });
    builder.addCase(getCountriesBySearch.fulfilled, (state, action) => {
      state.loading = false;
      state.searchedList = action.payload;
    });
    builder.addCase(getCountriesBySearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // getStates
    builder.addCase(getStatesBySearch.pending, state => {
      state.loading = true;
    });
    builder.addCase(getStatesBySearch.fulfilled, (state, action) => {
      state.loading = false;
      state.searchedStateList = action.payload;
    });
    builder.addCase(getStatesBySearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // getCountriesData
    builder.addCase(getCountiresData.pending, (state) => {
      state.loading = true;
    });
    
    builder.addCase(getCountiresData.fulfilled, (state, action) => {
      const locationType = action.payload.type;
      state.loading = false;
    
      switch (locationType) {
        case 'country':
          // Now stores data for multiple countries
          state.countries = action.payload.searchedData;
          break;
        case 'state':
          state.state = action.payload.searchedData;
          break;
        default:
          return;
      }
    });
    
    builder.addCase(getCountiresData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    
  },
});

export default propertySlice.reducer;
