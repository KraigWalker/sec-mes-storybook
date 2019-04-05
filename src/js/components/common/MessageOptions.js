import { NEW, READ, PENDING, ARCHIVED, DRAFT } from '../../constants/StringsConstants';

const getOptionDisplayFunctions = (readOnly, noReply) => {
  return {
    showUnarchiveButton: status => !readOnly && status === ARCHIVED,
    showArchiveButton: status =>
      !readOnly && status === READ,
    showDeleteButton: status => !readOnly && status !== PENDING && status !== NEW,
    showReplyButton: status =>
      (status === NEW || status === READ || status === ARCHIVED) &&
      !readOnly &&
      !noReply,
    showPending: status => status === PENDING
  };
};

export default getOptionDisplayFunctions;
