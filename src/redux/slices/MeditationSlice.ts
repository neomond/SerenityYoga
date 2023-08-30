import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '..';

import API_URL from '../../utils/apiConfig';
import {Meditation} from '../../models/Meditations';

interface MeditationsState {
  loading: boolean;
  error: string | null;
  meditations: Meditation[];
}

const initialState: MeditationsState = {
  loading: false,
  error: null,
  meditations: [],
};

export const fetchMeditations = createAsyncThunk(
  'api/meditations/fetchMeditations',
  async () => {
    const response = await axios.get(`${API_URL}/meditations`);
    return response.data;
  },
);

export const meditationsSlice = createSlice({
  name: 'meditations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMeditations.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMeditations.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.meditations = action.payload;
      console.log('mmememe');
    });
    builder.addCase(fetchMeditations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error fetching sessions';
    });
  },
});

export default meditationsSlice.reducer;
export const getMeditations = (state: RootState) => state.meditations;
