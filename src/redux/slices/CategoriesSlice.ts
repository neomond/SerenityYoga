import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState} from '..';

export interface Category {
  _id: string;
  category: string;
  data: DataItem[];
  likedItems: DataItem[];
}

export interface DataItem {
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

export const fetchCategories = createAsyncThunk('api/categories', async () => {
  try {
    const response = await axios.get(
      'http://192.168.10.48:8080/api/categories',
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
});

export const fetchCategoryById = createAsyncThunk(
  'api/categories/fetchById',
  async categoryId => {
    try {
      const response = await axios.get(
        `http://192.168.10.48:8080/api/categories/${categoryId}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with ID ${categoryId}:`, error);
      throw error;
    }
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addItemToLikedItems: (state, action) => {
      const {categoryId, item} = action.payload;
      const category = state.categories.find(c => c._id === categoryId);
      if (category) {
        category.likedItems.push(item);
      }
    },
    removeItemFromLikedItems: (state, action) => {
      const {categoryId, itemId} = action.payload;
      const category = state.categories.find(c => c._id === categoryId);
      if (category) {
        category.likedItems = category.likedItems.filter(
          item => item.key !== itemId,
        );
      }
    },
  },
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
    builder
      .addCase(fetchCategoryById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {addItemToLikedItems, removeItemFromLikedItems} =
  categoriesSlice.actions;

export const getCategories = (state: RootState) =>
  state.categoriesSlice.categories;

export default categoriesSlice.reducer;
