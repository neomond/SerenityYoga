import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../utils/apiConfig';
import {RootState} from '..';
import {MeditationSession} from '../../models/MeditationSession';

interface MeditationSessionsState {
  loading: boolean;
  error: string | null;
  meditationSessions: MeditationSession[];
}

const initialState: MeditationSessionsState = {
  loading: false,
  error: null,
  meditationSessions: [],
};

export const fetchMeditationSessions = createAsyncThunk(
  'api/meditation-sessions/fetchMeditationSessions',
  async () => {
    try {
      const response = await axios.get(`${API_URL}/meditation-sessions`);
      return response.data;
    } catch (error) {
      console.error('Error fetching meditation sessions:', error);
      throw error;
    }
  },
);

export const meditationSessionsSlice = createSlice({
  name: 'meditationSessions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMeditationSessions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeditationSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.meditationSessions = action.payload;
      })
      .addCase(fetchMeditationSessions.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? 'Error fetching meditation sessions';
      });
  },
});

export default meditationSessionsSlice.reducer;

export const selectMeditationSessions = (state: RootState) =>
  state.meditationSessions.meditationSessions;
export const selectMeditationSessionsLoading = (state: RootState) =>
  state.meditationSessions.loading;
export const selectMeditationSessionsError = (state: RootState) =>
  state.meditationSessions.error;
