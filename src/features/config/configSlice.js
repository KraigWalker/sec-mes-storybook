import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';

export const fetchConfig = createAsyncThunk('fetchConfig', async () => {
  const response = await fetch('./config.json');
  return response.json();
});

const configSlice = createSlice({
  name: 'config',
  initialState: {},
  reducers: {
    getConfig(state, action) {},
    updateConfig(state, action) {},
    clearConfig(state, action) {},
  },
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
