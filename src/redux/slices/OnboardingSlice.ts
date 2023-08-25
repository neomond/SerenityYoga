import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnboardingData: (state, action: PayloadAction<OnboardingState>) => {
      return {...state, ...action.payload};
    },
  },
});

export const {setOnboardingData} = onboardingSlice.actions;
export default onboardingSlice.reducer;
