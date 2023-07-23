import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
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
  async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/sessions/${id}`);
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
      console.log('fetchSessions fulfilled payload:', action.payload);
    });
    builder.addCase(fetchSessions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error fetching sessions';
    });
  },
});

export default sessionSlice.reducer;
export const getSessions = (state: RootState) => state.sessions.sessions;

// Get Meditation sessions
export const getMeditationSessions = createSelector(getSessions, sessions =>
  sessions.filter(session => session.title.includes('Meditation')),
);

// Fisher-Yates shuffle algorithm to shuffle an array randomly
const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  let currentIndex = shuffledArray.length;

  while (currentIndex !== 0) {
    // Pick a remaining element randomly
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap the current element with the randomly picked element
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }
  return shuffledArray;
};

// Compose the final selector
export const getRandomSessions = createSelector(
  (state: RootState) => state.sessions.sessions,
  sessions => {
    const shuffledSessions = shuffleArray(sessions);
    return shuffledSessions.slice(0, 5);
  },
);

// Function to get a certain number of random sessions from the shuffled array
// const selectRandomSessions = (sessions: any[], count: number) => {
//   const shuffledSessions = shuffleArray(sessions);
//   return shuffledSessions.slice(0, count);
// };
