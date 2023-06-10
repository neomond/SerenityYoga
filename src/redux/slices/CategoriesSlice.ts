import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '..';

interface Category {
  _id: string;
  category: string;
  data: DataItem[];
}

interface DataItem {
  key: string;
  title: string;
  duration: string;
  image: string;
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | any;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

// ipconfig getifaddr en0
// for home ----- 192.168.0.106
// for codeaca ----192.168.10.32

export const fetchCategories = createAsyncThunk('api/categories', async () => {
  try {
    const response = await axios.get(
      'http://192.168.0.106:8080/api/categories',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getCategories = (state: RootState) =>
  state.categoriesSlice.categories;

export default categoriesSlice.reducer;
