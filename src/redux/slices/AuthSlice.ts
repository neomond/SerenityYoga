import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '..';
import {Auth} from '../../models/Auth';
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
  },
});

export const getAuth = (state: RootState) => state.authSlice.user;

export default authSlice.reducer;
