import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '..';

interface LikedItem {
  key: string;
  title: string;
  duration: string;
  image: string;
}

interface LikedItemsState {
  likedItems: LikedItem[];
}

const initialState: LikedItemsState = {
  likedItems: [],
};

const likedItemsSlice = createSlice({
  name: 'likedItems',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.likedItems.push(action.payload);
    },
    removeItem: (state, action) => {
      state.likedItems = state.likedItems.filter(
        item => item.key !== action.payload,
      );
    },
  },
});

export const getLikes = (state: RootState) => state.likedItemsSlice.likedItems;
export default likedItemsSlice.reducer;
