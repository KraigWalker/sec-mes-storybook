import { createSlice } from '@reduxjs/toolkit';
import { accountsAdapter } from './messagesAdapter';

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: accountsAdapter.getInitialState({
    loading: 'idle', // may need to remove/replace after we create our thunk that fetches messages
  }),
  reducers: {},
  extraReducers: {},
});

// Extract the action creators object and the reducer
const { /*actions,*/ reducer } = accountsSlice;

// Extract and export each action creator by name
// export const { } = actions;

// Export the reducer, as a named export
export { reducer as accountsReducer };
