import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { messagesAdapter } from './messagesAdapter';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('authentication', `Bearer ${token}`);
    }

    headers.set('apiVersion', '1.2.0');

    return headers;
  },
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
        data: 'No `baseApiUrl` received from config.',
      },
    };
  } else if (!bankId) {
    return {
      error: {
        status: 400,
        data: 'No `bankId` received from session parameters.',
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

export const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => `securemessages`,
      transformResponse(response) {
        /** @todo should we be adding this to a more uniform entity store? */
        return response.secure_messages || [];
      },
    }),
  }),
});

export const { useGetMessagesQuery } = messagesApi;
