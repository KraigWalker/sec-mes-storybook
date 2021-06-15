import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

/**
  "createOAuthJWTTokenPath": "/banks/:bankId/auth/provider/oauth2/token/jwt",
  "exchangeOAuthJWTTokenPath": "/banks/:bankId/auth/provider/oauth2/token/exchange/jwt",
  "shortTermAccessTokenPath": "/banks/:bankId/auth/provider/oauth2/token/shortterm",
  "getPublicKeyPath": "/banks/auth/provider/oauth2/jwt/publickey"
 */

/**
 *
 * @param {String} bankId
 * @param {String?} appTitle
 * @returns
 */
function getAppIdFromBankId(bankId, appTitle) {
  return appTitle || `${bankId.toUpperCase()} Web`;
}

function buildClientContextHeader(bankId, userTrackingId = '') {
  /**
   * @todo Some of these values seem excessively verbose and retrograde.
   * Test to see if we can get rid of some of these through a
   * process of trial and error.
   * Or perhaps find an API Spec with information on the Headers required.
   */
  return JSON.stringify({
    client: {
      user_tracking_id: userTrackingId,
      app_title: getAppIdFromBankId(bankId),
      app_package_name: 'WEB',
      app_version_code: navigator.appVersion,
      app_version_name: navigator.appName,
    },
    env: {
      platform: 'WEB',
      platform_version:
        navigator.appVersion || navigator.vendor || window.opera,
      make: navigator.platform || window.opera,
      locale: navigator.language,
    },
  });
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '/',
});

const dynamicBaseQuery = async (args, api, extraOptions) => {
  const {
    config: { baseApiUrl },
    session: { bankId },
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
  const adjustedUrl = `${baseApiUrl}/banks/${bankId}/${urlEnd}`;
  const adjustedArgs =
    typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl };
  // provide the amended url and other params to the raw base query
  return rawBaseQuery(adjustedArgs, api, extraOptions);
};

export const oAuthApi = createApi({
  reducerPath: 'oAuth',
  baseQuery: dynamicBaseQuery,
  endpoints: (build) => ({
    getExchangeToken: build.query({
      query: ({
        shortExchangeToken = 'fakeShortToken' /** @todo get from state.session.exchangeToken instead */,
        bankId,
      }) => ({
        url: 'auth/provider/oauth2/token/exchange/jwt',
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${shortExchangeToken}`,
          'x-bpi-client-context': buildClientContextHeader(bankId),
          'x-bpi-service-context': 'USER',
          'X-TS-AJAX-Request': true,
        },
        body: 'grant_type=client_credentials&scope=30',
      }),
    }),
    getPublicToken: build.query({
      query: () => ({}),
    }),
  }),
});

export const {
  endpoints: { getExchangeToken },
} = oAuthApi;
