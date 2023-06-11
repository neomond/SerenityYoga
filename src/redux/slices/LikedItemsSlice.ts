import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '..';

interface DataItem {
  key: string;
  title: string;
  duration: string;
  image: string;
}

interface LikedItemsState {
  likedItems: DataItem[];
}

const initialState: LikedItemsState = {
  likedItems: [],
};

export const loadLikedItems = createAsyncThunk(
  'likedItems/loadLikedItems',
  async () => {
    try {
      const storedItems = await AsyncStorage.getItem('likedItems');
      if (storedItems) {
        return JSON.parse(storedItems) as DataItem[];
      }
    } catch (error) {
      console.error('Failed to load liked items:', error);
    }
    return [];
  },
);

export const addItem = createAsyncThunk(
  'likedItems/addItem',
  async (item: DataItem, {getState}) => {
    const state = getState() as RootState;
    const {likedItems} = state.likedItemsSlice;
    const updatedItems = [...likedItems, item];
    await AsyncStorage.setItem('likedItems', JSON.stringify(updatedItems));
    return updatedItems;
  },
);

export const removeItem = createAsyncThunk(
  'likedItems/removeItem',
  async (key: string, {getState}) => {
    const state = getState() as RootState;
    const {likedItems} = state.likedItemsSlice;
    const updatedItems = likedItems.filter(item => item.key !== key);
    await AsyncStorage.setItem('likedItems', JSON.stringify(updatedItems));
    return updatedItems;
  },
);

const likedItemsSlice = createSlice({
  name: 'likedItems',
  initialState,
  reducers: {
    setLikedItems: (state, action) => {
      state.likedItems = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadLikedItems.fulfilled, (state, action) => {
        state.likedItems = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.likedItems = action.payload;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.likedItems = action.payload;
      });
  },
});

export const {setLikedItems} = likedItemsSlice.actions;

export const getLikes = (state: RootState) => state.likedItemsSlice.likedItems;

export default likedItemsSlice.reducer;
