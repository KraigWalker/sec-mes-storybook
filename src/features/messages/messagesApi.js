import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../queryBuilders/dynamicBaseQuery';
// import { messagesAdapter } from './messagesAdapter';

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
