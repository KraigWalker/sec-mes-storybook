import { configureStore } from '@reduxjs/toolkit';
import { authReducer as auth } from '../features/auth/authSlice';
import { oAuthApi } from '../features/auth/oAuthApi';
import { configReducer as config } from '../features/config/configSlice';
// import { messagesReducer as messages } from '../features/messages/messagesSlice';
import { messagesApi } from '../features/messages/messagesApi';
import { accountsApi } from '../features/accounts/accountsApi';
import { sessionReducer as session } from '../features/session/sessionSlice';

/**
 * The central Redux store used throughout the app, combining multiple "feature"
 * slices into a single collection.
 */
export const store = configureStore({
  reducer: {
    auth,
    config,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [oAuthApi.reducerPath]: oAuthApi.reducer,
    session,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      accountsApi.middleware,
      messagesApi.middleware,
      oAuthApi.middleware
    ),
});
