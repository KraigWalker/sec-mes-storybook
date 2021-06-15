import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAuthTokenFromLocationHash = createAsyncThunk(
  'auth/getAuthTokenFromLocationHash',
  (_arg, { rejectWithValue }) => {
    return rejectWithValue('bar');
  }
);
