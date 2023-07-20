import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '..';
import {Session} from '../../models/Session';
import API_URL from '../../utils/apiConfig';

interface SessionState {
  sessions: Session[];
  loading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  sessions: [],
  loading: false,
  error: null,
};

export const fetchSessions = createAsyncThunk(
  'api/sessions/fetchSessions',
  async () => {
    try {
      const response = await axios.get(`${API_URL}/sessions`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  },
);

export const sessionSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSessions.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSessions.fulfilled, (state, action) => {
      state.sessions = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchSessions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error fetching sessions';
    });
  },
});

export default sessionSlice.reducer;
export const getSessions = (state: RootState) => state.sessions.sessions;
