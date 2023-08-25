import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import API_URL from '../../utils/apiConfig';

interface OnboardingState {
  name?: string;
  activityLevel?: string | any;
  weight?: string;
  height?: string;
  birthdate?: string;
}

const initialState: OnboardingState = {
  name: '',
  activityLevel: '',
  weight: '',
  height: '',
  birthdate: '',
};

export const fetchOnboardingData = createAsyncThunk(
  'onboarding/fetchData',
  async () => {
    const response = await axios.get(`${API_URL}/onboarding`);
    return response.data;
  },
);

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnboardingData: (state, action: PayloadAction<OnboardingState>) => {
      return {...state, ...action.payload};
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchOnboardingData.fulfilled, (state, action) => {
      return {...state, ...action.payload};
    });
  },
});

export const {setOnboardingData} = onboardingSlice.actions;
export default onboardingSlice.reducer;
