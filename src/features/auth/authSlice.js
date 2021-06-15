import { createSlice } from '@reduxjs/toolkit';
import { getAuthTokenFromLocationHash } from './getAuthTokenFromLocationHash';
import { getAuthToken } from './getAuthToken';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    publicToken: null,
  },
  reducers: {},
  extraReducers: {
    // [getAuthTokenFromCookie.fulfilled]: (state, action) => {
    //   state.accessToken = action.payload;
    // },
    [getAuthTokenFromLocationHash.fulfilled]: (state, action) => {
      state.accessToken = action.payload;
    },
    [getAuthToken.rejected]: (state, action) => {},
    [getAuthToken.fulfilled]: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

// Extract the action creators object and the reducer
const { /* actions,*/ reducer } = authSlice;

// Extract and export each action creator by name
//export const {   } = actions;

// Export the reducer, as a named export
export { reducer as authReducer };
