import { createEntityAdapter } from '@reduxjs/toolkit';

const accountsAdapter = createEntityAdapter({
  selectId: (account) => account.id,
});

// A set of memoized selectors based on the location of this entity state
const accountsSelectors = accountsAdapter.getSelectors(
  (state) => state.accounts
);

export { accountsAdapter, accountsSelectors };
