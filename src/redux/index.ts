import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './slices/AuthSlice';
import CategoriesSlice from './slices/CategoriesSlice';

const store = configureStore({
  reducer: {
    authSlice: AuthSlice,
    categoriesSlice: CategoriesSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
