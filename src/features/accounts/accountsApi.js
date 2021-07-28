import { createApi } from '@reduxjs/toolkit/query/react';
import { dynamicBaseQuery } from '../queryBuilders/dynamicBaseQuery';
// import { accountsAdapter } from './accountsAdapter';

export const accountsApi = createApi({
  reducerPath: 'accounts',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Account'],
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: () => `accounts/default`, // the query path added to the basePath built by `dynamicBaseQuery`
      transformResponse(response) {
        /** @todo should we be adding this to a more uniform entity store? */
        return response.accounts || [];
      },
    }),
  }),
});

export const { useGetAccountsQuery } = accountsApi;
