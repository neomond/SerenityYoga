import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '..';
import {
  Auth,
  ConfirmAndResetPasswordParams,
  SendOtpParams,
} from '../../models/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface InitialStateType {
  loading: 'rejected' | 'fulfilled' | 'pending' | null;
  users: Auth[];
  error: any | null;
  user: Auth | null;
  token: string | null;
}

const initialState: any = {
  loading: null,
  users: [],
  error: null,
  user: null,
  token: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    {email, password}: {email: string; password: number},
    {rejectWithValue},
  ) => {
    try {
      console.log('teeestt', email + password);
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        {
          email,
          password,
        },
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  },
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (
    {
      email,
      password,
      confirmPassword,
    }: {email: string; password: number; confirmPassword: number},
    {rejectWithValue},
  ) => {
    if (password !== confirmPassword) {
      return rejectWithValue('Passwords do not match');
    }
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/signup',
        {
          email,
          password,
        },
      );
      console.log('sa;a', response.data);

      return response.data;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Signup failed');
    }
  },
);

export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async ({email}: SendOtpParams, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/send-otp',
        {email},
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const confirmAndResetPassword = createAsyncThunk(
  'auth/confirmAndResetPassword',
  async (
    {email, otp, newPassword}: ConfirmAndResetPasswordParams,
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/confirm-reset-password',
        {email, otp, newPassword},
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    //-------FOR LOGIN---------
    builder
      .addCase(loginUser.pending, (state: any) => {
        state.loading = 'pending';
      })
      .addCase(loginUser.fulfilled, (state: any, action: any) => {
        state.loading = 'fulfilled';
        state.token = action.payload.token;
        state.user = action.payload.user;
        try {
          AsyncStorage.setItem('token', JSON.stringify(action.payload.token));
          console.log('stooorrring');
        } catch (error) {
          console.log('Error storing token in AsyncStorage:', error);
        }
      })
      .addCase(loginUser.rejected, (state: any, action: any) => {
        state.loading = 'rejected';
        state.error = action.error;
        console.log('err', state.error);
        state.token = null;
      });
    //-------FOR SIGN UP---------
    builder
      .addCase(signupUser.pending, (state: any) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state: InitialStateType, action: any) => {
        state.loading = 'fulfilled';
        state.error = null;
        //   state.user = action.payload;
        state.token = action.payload;
      })
      .addCase(signupUser.rejected, (state: InitialStateType, action: any) => {
        state.loading = 'rejected';
        state.error = action.error;
        console.log('errrrr', action.payload);
        state.error = action.payload || 'Signup failed';
        state.token = null;
      });

    //-------FOR OTP---------
    builder
      .addCase(sendOtp.pending, (state: any) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state: any, action: any) => {
        state.loading = 'fulfilled';
        state.error = null;
        state.password = action.payload.password;
      })
      .addCase(sendOtp.rejected, (state: InitialStateType, action: any) => {
        state.loading = 'rejected';
        state.error = action.payload;
      });

    // -------FOR CONFIRMING AND RESETTING PWD-------
    builder
      .addCase(confirmAndResetPassword.pending, (state: any) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(confirmAndResetPassword.fulfilled, (state: any) => {
        state.loading = 'fulfilled';
        state.error = null;
      })
      .addCase(
        confirmAndResetPassword.rejected,
        (state: InitialStateType, action: any) => {
          state.loading = 'rejected';
          state.error = action.payload;
          console.log('sendOtp error:', action.payload);
        },
      );
  },
});

export const getAuth = (state: RootState) => state.authSlice.user;
export const {setAuthenticated} = authSlice.actions;
export default authSlice.reducer;
