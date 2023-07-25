import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '..';
import {Session} from '../../models/Session';

interface LikedItemsState {
  likedItems: Session[];
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
        return JSON.parse(storedItems) as Session[];
      }
    } catch (error) {
      console.error('Failed to load liked items:', error);
    }
    return [];
  },
);

export const addItem = createAsyncThunk(
  'likedItems/addItem',
  async (item: Session, {getState}) => {
    const state = getState() as RootState;
    const {likedItems} = state.likedItems;
    const updatedItems = [...likedItems, item];
    await AsyncStorage.setItem('likedItems', JSON.stringify(updatedItems));
    return updatedItems;
  },
);

export const removeItem = createAsyncThunk(
  'likedItems/removeItem',
  async (key: string, {getState}) => {
    const state = getState() as RootState;
    const {likedItems} = state.likedItems;
    const updatedItems = likedItems.filter(item => item._id !== key);
    await AsyncStorage.setItem('likedItems', JSON.stringify(updatedItems));
    return updatedItems;
  },
);

export const clearLikedItems = createAsyncThunk(
  'likedItems/clearLikedItems',
  async () => {
    await AsyncStorage.removeItem('likedItems');
    return [];
  },
);

export const likedItemsSlice = createSlice({
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
      })
      .addCase(clearLikedItems.fulfilled, (state, action) => {
        state.likedItems = action.payload;
      })
      .addMatcher(
        action =>
          [
            loadLikedItems.rejected,
            addItem.rejected,
            removeItem.rejected,
            clearLikedItems.rejected,
          ].includes(action.type),
        (state, action) => {
          console.error('Error occurred:', action.error);
        },
      );
  },
});

export const {setLikedItems} = likedItemsSlice.actions;

export const getLikes = (state: RootState) => state.likedItems.likedItems;

export default likedItemsSlice.reducer;
