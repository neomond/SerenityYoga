// ipconfig getifaddr en0
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '..';
import {Category} from '../../models/Category';
import API_URL from '../../utils/apiConfig';

interface CategoriesState {
  loading: boolean;
  error: string | null;
  categories: Category[];
}

const initialState: CategoriesState = {
  loading: false,
  error: null,
  categories: [],
};

export const fetchCategories = createAsyncThunk(
  'api/categories/fetchCategories',
  async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  },
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategories.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.categories = action.payload;
      console.log('mmememe');
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Error fetching sessions';
    });
  },
});

export default categoriesSlice.reducer;
export const getCategories = (state: RootState) => state.categories;
