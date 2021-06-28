import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { buildClientContextHeader } from './buildClientContextHeader';

/**
  "createOAuthJWTTokenPath": "/banks/:bankId/auth/provider/oauth2/token/jwt",
  "exchangeOAuthJWTTokenPath": "/banks/:bankId/auth/provider/oauth2/token/exchange/jwt",
  "shortTermAccessTokenPath": "/banks/:bankId/auth/provider/oauth2/token/shortterm",
  "getPublicKeyPath": "/banks/auth/provider/oauth2/jwt/publickey"
 */

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '/',
});

const dynamicBaseQuery = async (args, api, extraOptions) => {
  const {
    config: { baseApiUrl },
  } = api.getState();

  // gracefully handle scenarios where data to generate the URL is missing
  if (!baseApiUrl) {
    return {
      error: {
        status: 400,
        data: 'No base API URL recieved',
      },
    };
  }

  const urlEnd = typeof args === 'string' ? args : args.url;

  // construct a dynamically generated potion of the url
  const adjustedUrl = `${baseApiUrl}/banks/${urlEnd}`;
  const adjustedArgs =
    typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl };
  // provide the amended url and other params to the raw base query
  return rawBaseQuery(adjustedArgs, api, extraOptions);
};

const authProviderOAuth2Path = 'auth/provider/oauth2/';
const USER = 'USER';

export const oAuthApi = createApi({
  reducerPath: 'oAuth',
  baseQuery: dynamicBaseQuery,
  endpoints: (build) => ({
    getExchangeToken: build.query({
      query: ({
        shortExchangeToken = 'fakeShortToken' /** @todo get from state.session.exchangeToken instead */,
        bankId,
      }) => ({
        url: `${bankId}/${authProviderOAuth2Path}token/exchange/jwt`,
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${shortExchangeToken}`,
          /** @todo generalize these by adding to dynamicBaseQuery */
          'x-bpi-client-context': buildClientContextHeader(bankId),
          'x-bpi-service-context': USER,
          'X-TS-AJAX-Request': true,
        },
        body: 'grant_type=client_credentials&scope=30',
      }),
    }),

    /// oauthService.getPublicKey(
    // paasApiUrl,
    // bank_id.toUpperCase(),
    // user_tracking_id
    //);

    getPublicKey: build.query({
      query: ({ bankId }) => ({
        url: `${authProviderOAuth2Path}jwt/publickey`,
        headers: {
          /** @todo generalize these by adding to dynamicBaseQuery */
          'x-bpi-client-context': buildClientContextHeader(bankId),
          'x-bpi-service-context': USER,
          'X-TS-AJAX-Request': true,
        },
      }),
    }),
  }),
});

export const {
  endpoints: { getExchangeToken, getPublicKey },
} = oAuthApi;
