import { createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter({
  selectId: (message) => message.id,
  // Keep the "all IDs" array sorted based on creation datetime
  /** @note currently using example code soteing `.title` alphabetically */
  //sortComparer: (a, b) => a.title.localeCompare(b.title),
});

// A set of memoized selectors based on the location of this entity state
const messagesSelectors = messagesAdapter.getSelectors(
  (state) => state.messages
);

export { messagesAdapter, messagesSelectors };
