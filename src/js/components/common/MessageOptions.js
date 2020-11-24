import { NEW, READ, PENDING, ARCHIVED } from '../../constants/StringsConstants';

export function getOptionDisplayFunctions(readOnly, noReply) {
  return {
    showUnarchiveButton: (status) => !readOnly && status === ARCHIVED,
    showArchiveButton: (status) => !readOnly && status === READ,
    showDeleteButton: (status) =>
      !readOnly && status !== PENDING && status !== NEW,
    showReplyButton: (status) =>
      (status === NEW || status === READ || status === ARCHIVED) &&
      !readOnly &&
      !noReply,
    showPending: (status) => status === PENDING,
  };
}
