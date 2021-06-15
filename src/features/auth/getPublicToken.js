import { createAsyncThunk } from '@reduxjs/toolkit';

export const getPublicToken = createAsyncThunk(
  'auth/getAuthToken',
  async (_arg, { dispatch, rejectWithValue }) => {
    const { payload, error } = await dispatch(getAuthTokenFromCookie());

    return error ? rejectWithValue() : payload;
  }
);
