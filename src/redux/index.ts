import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import CategoriesSlice from './slices/CategoriesSlice';
import LikedItemsSlice from './slices/LikedItemsSlice';
const middleware = getDefaultMiddleware({
  serializableCheck: false, // Disable serializable state check
});

const store = configureStore({
  reducer: {
    authSlice: AuthSlice,
    categoriesSlice: CategoriesSlice,
    likedItemsSlice: LikedItemsSlice,
  },
  middleware,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
