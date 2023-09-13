import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '..';
import {Session} from '../../models/Session';
import API_URL from '../../utils/apiConfig';

interface SessionState {
  sessions: Session[];
  loading: boolean;
  selectedSessions: any;
  error: string | null;
  filterType: string;
}

const initialState: SessionState = {
  sessions: [],
  loading: false,
  selectedSessions: [],
  error: null,
  filterType: '',
};

export const fetchSessionsByType = createAsyncThunk(
  'api/sessions/fetchSessionsByType',
  async (type: string) => {
    try {
      const response = await axios.get(`${API_URL}/sessions?type=${type}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sessions by type:', error);
      throw error;
    }
  },
);

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

export const fetchSessionsByIds = createAsyncThunk(
  'api/sessions/fetchSessionsByIds',
  async (sessionIds: string[]) => {
    try {
      const sessionIdsString = sessionIds.join(',');

      const response = await axios.get(
        `${API_URL}/sessions/${sessionIdsString}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching sessions by IDs:', error);
      throw error;
    }
  },
);

export const fetchSessionsAll = createAsyncThunk(
  'api/sessions/fetchSessionsAll',
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
  reducers: {
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSessionsAll.fulfilled, (state, action) => {
      state.sessions = action.payload;
    });
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
    // for all sessions
    builder.addCase(fetchSessionsByIds.fulfilled, (state, action) => {
      state.selectedSessions = action.payload;
    });
    builder.addCase(fetchSessionsByType.fulfilled, (state, action) => {
      state.sessions = action.payload;
    });
  },
});

export default sessionSlice.reducer;
export const getSessions = (state: RootState) => state.sessions.sessions;

// Get Meditation sessions
export const getMeditationSessions = createSelector(getSessions, sessions =>
  sessions.filter(session => session.title.includes('Meditation')),
);

export const {setFilterType} = sessionSlice.actions;

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
    const filteredSessions = sessions.filter(
      session => !session.title.includes('Meditation'),
    );
    const shuffledSessions = shuffleArray(filteredSessions);
    return shuffledSessions.slice(0, 5);
  },
);

export const getNonMeditationSessions = createSelector(
  (state: RootState) => state.sessions.sessions,
  sessions => sessions.filter(session => !session.title.includes('Meditation')),
);

export const getRandomNonMeditationSessions = createSelector(
  getNonMeditationSessions,
  sessions => {
    // Shuffle the sessions array
    const shuffledSessions = shuffleArray(sessions);
    // Return the first 3 sessions (or fewer if there are less than 3)
    return shuffledSessions.slice(0, 5);
  },
);

export const getSelectedSessions = (state: RootState) =>
  state.sessions.selectedSessions;
