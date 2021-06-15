import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import { getAuthToken } from '../auth/getAuthToken';
import { getSessionDetails } from '../session/sessionSlice';

export const fetchConfig = createAsyncThunk('fetchConfig', async () => {
  const response = await fetch('./config.json');
  return response.json();
});

export const appStartup = createAsyncThunk(
  'startup',
  async (args, { dispatch }) =>
    Promise.all([
      await dispatch(fetchConfig()),
      await dispatch(getSessionDetails()),
    ]).then(async () =>
      Promise.all([
        /** get  */
        await dispatch(getAuthToken()),
      ]).then(() => {
        Promise.resolve();
      })
    )
);

const configSlice = createSlice({
  name: 'config',
  initialState: { baseApiUrl: null },
  extraReducers: {
    [fetchConfig.fulfilled]: (state, action) => {
      state.baseApiUrl = action.payload.paasBaseApiUrl;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = configSlice;

// Extract and export each action creator by name
export const { getConfig, updateConfig, clearConfig } = actions;
// Export the reducer, as a named export
export { reducer as configReducer };

function baseApiUrlSelector(state) {
  return state.baseApiUrl;
}

export const selectBaseApiUrl = createSelector(baseApiUrlSelector);
