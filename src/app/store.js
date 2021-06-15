import { configureStore } from '@reduxjs/toolkit';
import { authReducer as auth } from '../features/auth/authSlice';
import { configReducer as config } from '../features/config/configSlice';
// import { messagesReducer as messages } from '../features/messages/messagesSlice';
import { messagesApi } from '../features/messages/messagesApi';

/**
 * The central Redux store used throughout the app, combining multiple "feature"
 * slices into a single collection.
 */
export const store = configureStore({
  reducer: {
    auth,
    config,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(messagesApi.middleware),
});
