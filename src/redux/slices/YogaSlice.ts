import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '..';

import API_URL from '../../utils/apiConfig';
import {Yoga} from '../../models/Yoga';

interface YogaState {
  loading: boolean;
  error: string | null;
  yogas: Yoga[];
}

const initialState: YogaState = {
  loading: false,
  error: null,
  yogas: [],
};

export const fetchYogas = createAsyncThunk('api/yoga/fetchYogas', async () => {
  try {
    const response = await axios.get(`${API_URL}/yoga`);
    return response.data;
  } catch (error) {
    console.error('Error fetching yogas:', error);
    throw error;
  }
});

export const yogaSlice = createSlice({
  name: 'yoga',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchYogas.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchYogas.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.yogas = action.payload;
    });
    builder.addCase(fetchYogas.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error fetching yogas';
    });
  },
});

export default yogaSlice.reducer;
export const getYogas = (state: RootState) => state.yoga.yogas;

export const selectYogaLoading = (state: RootState) => state.yoga.loading;
