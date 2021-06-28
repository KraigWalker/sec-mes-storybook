import { createAsyncThunk } from '@reduxjs/toolkit';
import { getExchangeToken, getPublicKey } from './oAuthApi';

export const getAuthTokenFromCookie = createAsyncThunk(
  'auth/getAuthTokenFromCookie',
  async (args, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    //let jwtToken;

    const {
      session: { exchangeToken, bankId },
    } = getState();

    let finalPublicKey;
    let finalJwt;

    if (bankId) {
      // Integrate the public key API
      const {
        data: { public_key: publicKey },
      } = await dispatch(getPublicKey.initiate({ bankId }));

      finalPublicKey = publicKey;
    }

    /**
     * Check if `exchangeToken` was parsed from `window.location.hash`.
     * This indicates a "mobile-to-web" User Session.
     * @todo rename mentions of 'exchangeToken' to 'shortTermToken' to reduce confusion
     */
    if (exchangeToken && bankId) {
      // Integrate the exchange token API based on short term token
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
      const { get } = await import('js-cookie');

      const jwtToken = get('ibjwt');

      if (!jwtToken) {
        return rejectWithValue('could not retrieve a value from Cookie');
      } else {
        finalJwt = jwtToken.trim();
      }
    }

    // Integrate the verify token method
    // return getDecodedJWTToken(jwtToken, publicKey);

    //const decodedAuthToken = validateAuthToken(jwtToken, publicKey);
    //return !decodedAuthToken.error ? decodedAuthToken.jti : null;
    // Public key needs to be in PEM format for the jsonwebtoken lib so this is why we have the following
    if (process.env.NODE_ENV === 'production') {
      // only try and work with a real token in production mode (for now)
      const jwt = await import('jsonwebtoken');

      try {
        const decodedJWT = jwt.verify(
          finalJwt,
          `-----BEGIN PUBLIC KEY-----${finalPublicKey}-----END PUBLIC KEY-----`,
          {
            algorithms: [
              'RS256',
              'HS256',
              'HS384',
              'HS512',
              'RS384',
              'RS512',
              'none',
            ],
          }
        );
        return fulfillWithValue(decodedJWT);
      } catch ({ name, message, stack }) {
        return rejectWithValue({
          name,
          message,
          stack,
        });
      }
    } else {
      // For now in development, bypass all this
      return fulfillWithValue('thisIsAFakeJWTBecauseWeAreInDevelopmentMode');
    }
  }
);
