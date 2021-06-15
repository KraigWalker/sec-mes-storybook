import { createAsyncThunk } from '@reduxjs/toolkit';
import { getExchangeToken } from './oAuthApi';

export const getAuthTokenFromCookie = createAsyncThunk(
  'auth/getAuthTokenFromCookie',
  async (args, { dispatch, getState, rejectWithValue }) => {
    //let jwtToken;

    /**
     * Check if `exchangeToken` was parsed from `window.location.hash`.
     * This indicates a "mobile-to-web" User Session.
     */
    if (/*thunkAPI.getState().session.exchangeToken*/ true) {
      //let shortTermToken; // = thunkAPI.getState().session.exchangeToken;

      if (process.env.NODE_ENV !== 'production') {
        /**
         * @note Kraig – "I'm doubtful we need to keep this when we can use a mocked token"
         */
        // shortTermToken = await getShortTermToken(
        //  bank_id,
        //  user_tracking_id,
        //  access_token,
        //  paasApiUrl
        // );
      }

      // Integrate the exchange token API based on short term token

      const {
        session: { exchangeToken, bankId },
      } = getState();

      const jwtToken = await dispatch(
        getExchangeToken.initiate({ exchangeToken, bankId })
      );

      if (!jwtToken.error) {
        return jwtToken.data;
      }

      return jwtToken;
      // jwtToken = await getExchangeToken(
      //  bank_id,
      //  user_tracking_id,
      //  paasApiUrl,
      //  shortTermToken
      // );
    } else {
      // jwtToken = getAuthCookie();
    }
    // Integrate the public key API
    // const publicKey = await getPublicKey(bank_id, user_tracking_id, paasApiUrl);

    // Integrate the verify token method
    // return getDecodedJWTToken(jwtToken, publicKey);

    return rejectWithValue('foo' /*getDecodedJWTToken(jwtToken, publicKey)*/);
  }
);
