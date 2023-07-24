import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import categoriesReducer from './slices/CategoriesSlice';
import LikedItemsSlice from './slices/LikedItemsSlice';
import sessionReducer from './slices/SessionSlice';

// const middleware = getDefaultMiddleware({
//   serializableCheck: false, // Disable serializable state check
// });

const store = configureStore({
  reducer: {
    authSlice: AuthSlice,
    categories: categoriesReducer,
    likedItems: LikedItemsSlice,
    sessions: sessionReducer,
  },
  // middleware,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
