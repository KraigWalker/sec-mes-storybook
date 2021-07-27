import { createSlice } from '@reduxjs/toolkit';
import { parse } from 'query-string';

/**
 * It's a hassle to plug query params into local dev, so use some sensible defaults
 */
const devDefaults =
  process.env.NODE_ENV !== 'production'
    ? {
        bankId: 'cb',
      }
    : {};

if (process.env.NODE_ENV !== 'production') {
  console.warn('process.env.NODE_ENV !== "production".');
  console.warn('Enabling developer fallback session values.');
}

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    /*userTrackingId: null,
    bankId: null,
    brandId: null,
    state: null,
    clientContext: null,
    isDocumentLibraryEnabled: null,
    exchangeToken: null,
		access_token: null <–– deprecated, moved to authSlice */
  },
  reducers: {
    getSessionDetails(state, action) {
      /**
       * Parsed session details from the URL query string.
       */
      const query = parse(window.location.search);
      /**
       * Depending on the competency of the external webapps that link Users to
       * this app, some of this data may actually be passed
       * within the url fragment hash (`#`) in a query-string-like format.
       * An example of this is `exchangeToken`, and (now deprecated) `access_token`.
       */
      const hash = parse(window.location.hash);

      return {
        ...((query.user_tracking_id || hash.user_tracking_id) && {
          userTrackingId:
            query.user_tracking_id || hash.user_tracking_id || null,
        }),
        ...((query.bank_id ||
          query.bankId ||
          hash.bank_id ||
          hash.bankId ||
          devDefaults.bankId) && {
          bankId:
            query.bank_id ||
            query.bankId ||
            hash.bank_id ||
            hash.bankId ||
            devDefaults.bankId ||
            null,
        }),
        ...((query.brandId ||
          query.brand_id ||
          hash.brandId ||
          hash.brand_id) && {
          brandId:
            query.brandId || query.brand_id || hash.brandId || hash.brand_id,
        }),
        ...((query.state || hash.state) && {
          state: query.state || hash.state,
        }),
        ...((query.client_context || hash.client_context) && {
          clientContext: query.client_context || hash.client_context,
        }),
        ...((query.isDocumentLibraryEnabled ||
          hash.isDocumentLibraryEnabled) && {
          isDocumentLibraryEnabled:
            query.isDocumentLibraryEnabled || hash.isDocumentLibraryEnabled,
        }),
        ...((query.exchangeToken || hash.exchangeToken) && {
          exchangeToken: query.exchangeToken || hash.exchangeToken,
        }),
      };
    },
    /** @todo Implement once comfortable everything works */
    clearQueryString(state) {
      return state;
    },
    /** @todo Implement once comfortable everything works */
    clearHash(state) {
      return state;
    },
  },
  extraReducers: {},
});

// Extract the action creators object and the reducer
const { actions, reducer } = sessionSlice;

// Extract and export each action creator by name
export const { getSessionDetails } = actions;

// Export the reducer, as a named export
export { reducer as sessionReducer };
