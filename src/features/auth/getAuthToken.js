import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthTokenFromCookie } from './getAuthTokenFromCookie';
import { getAuthTokenFromLocationHash } from './getAuthTokenFromLocationHash';

export const getAuthToken = createAsyncThunk(
  'auth/getAuthToken',
  async (_arg, { dispatch, rejectWithValue }) => {
    const { payload, error } = await dispatch(getAuthTokenFromCookie());

    if (error) {
      const { payload, error } = await dispatch(getAuthTokenFromLocationHash());
      return error ? rejectWithValue() : payload;
    } else {
      return payload;
    }
  }
);
