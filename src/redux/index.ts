import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import CategoriesSlice from './slices/CategoriesSlice';
import LikedItemsSlice from './slices/LikedItemsSlice';

const store = configureStore({
  reducer: {
    authSlice: AuthSlice,
    categoriesSlice: CategoriesSlice,
    likedItemsSlice: LikedItemsSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
