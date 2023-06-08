import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '..';
import {Auth} from '../../models/Auth';

interface InitialStateType {
  loading: 'rejected' | 'fulfilled' | 'pending' | null;
  users: Auth[];
  error: any | null;
  user: Auth | null;
  token: string | null;
}

const initialState: InitialStateType = {
  loading: null,
  users: [],
  error: null,
  user: null,
  token: null,
};

// axios.interceptors.request.use(config => {
//   const token = ''; // from storage ?????
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// const token = useSelector(state => state.auth.token);

// useEffect(() => {
//   if (!token) {
//     navigation.navigate('Login');
//   }
// }, [token]);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });
      return response.data.token;
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
    }: {email: string; password: string; confirmPassword: string},
    {rejectWithValue},
  ) => {
    if (password !== confirmPassword) {
      return rejectWithValue('Passwords do not match');
    }
    try {
      console.log('atdim');
      const response = await axios.post(
        'http://localhost:8080/api/auth/signup',
        {
          email,
          password,
        },
      );

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
  extraReducers: builder => {
    //-------FOR LOGIN---------
    builder
      .addCase(loginUser.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.error = null;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
        state.token = null;
      });
    //-------FOR SIGN UP---------
    builder
      .addCase(signupUser.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.error = null;
        console.log('full');

        state.token = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
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
