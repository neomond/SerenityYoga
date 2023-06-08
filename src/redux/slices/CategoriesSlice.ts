import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '..';

interface Category {
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

export const fetchCategories = createAsyncThunk('api/categories', async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/categories');
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
        console.log('kkkkk');
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
