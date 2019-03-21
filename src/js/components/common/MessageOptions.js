import { NEW, READ, PENDING, SENT, ARCHIVED } from '../../constants/StringsConstants';

const getOptionDisplayFunctions = (readOnly, noReply) => {
  return {
    showUnarchiveButton: status => !readOnly && status === ARCHIVED,
    showArchiveButton: status =>
      !readOnly && status !== NEW && status !== ARCHIVED && status !== SENT && status !== PENDING,
    showDeleteButton: status => !readOnly && status !== PENDING && status !== NEW,
    showReplyButton: status =>
      (status === NEW || status === READ || status === ARCHIVED) &&
      !readOnly &&
      !noReply,
    showPending: status => status === PENDING
  };
};

export default getOptionDisplayFunctions;
