import { configureStore } from '@reduxjs/toolkit';
import { authReducer as auth } from '../features/auth/authSlice';
import { configReducer as config } from '../features/config/configSlice';

/**
 * The central Redux store used throughout the app, combining multiple "feature"
 * slices into a single collection.
 */
export const store = configureStore({
  reducer: {
    auth,
    config,
  },
});
