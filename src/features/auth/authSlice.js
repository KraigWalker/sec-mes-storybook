import { /*createAsyncThunk,*/ createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
  },
  reducers: {},
  extraReducers: {},
});

// Extract the action creators object and the reducer
const { /*actions,*/ reducer } = authSlice;

// Extract and export each action creator by name
// export const { } = actions;

// Export the reducer, as a named export
export { reducer as authReducer };
