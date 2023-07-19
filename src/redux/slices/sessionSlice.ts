import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Session} from '../../models/Session';
import axios from 'axios';
import {RootState} from '..';

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

export const fetchSessions = createAsyncThunk('api/sessions', async () => {
  try {
    const response = await axios.get('http://192.168.0.102:8080/api/sessions');
    return response.data;
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
});

export default sessionSlice.reducer;
export const getSessions = (state: RootState) => state.sessions.sessions;
