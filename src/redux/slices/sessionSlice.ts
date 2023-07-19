import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '..';
import {Session} from '../../models/Session';
import {Category} from '../../models/Category';

interface SessionState {
  sessions: Session[];
  loading: boolean;
  error: string | null;
  categories: Category[];
}

const initialState: SessionState = {
  sessions: [],
  loading: false,
  error: null,
  categories: [],
};

export const fetchSessions = createAsyncThunk(
  'api/sessions/fetchSessions',
  async () => {
    try {
      const response = await axios.get(
        'http://192.168.0.102:8080/api/sessions',
      );
      const data = response.data;
      const categories = data
        .map((session: Session) => session.categories)
        .flat();
      return {sessions: data, categories};
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
      state.sessions = action.payload.sessions;
      state.categories = action.payload.categories;
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
