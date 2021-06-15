import { createSlice } from '@reduxjs/toolkit';
import { messagesAdapter } from './messagesAdapter';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({
    loading: 'idle', // may need to remove/replace after we create our thunk that fetches messages
  }),
  reducers: {},
  extraReducers: {},
});

// Extract the action creators object and the reducer
const { /*actions,*/ reducer } = messagesSlice;

// Extract and export each action creator by name
// export const { } = actions;

// Export the reducer, as a named export
export { reducer as messagesReducer };
