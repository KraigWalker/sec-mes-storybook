import { combineReducers } from 'redux';
import errors, { selectors as errorSelectors } from './MessageErrorReducer';
import messageData, {
  selectors as messageSelectors,
} from './MessageUpdatesReducer';

export default combineReducers({
  messageData,
  errors,
});

export const getMessages = (state) =>
  messageSelectors.getMessages(state.messageData);
export const getShowSuccessModal = (state) =>
  messageSelectors.getShowSuccessModal(state.messageData);
export const getFetching = (state) =>
  messageSelectors.getFetching(state.messageData);
export const getFetched = (state) =>
  messageSelectors.getFetched(state.messageData);

export const getUpdating = (state) =>
  messageSelectors.getUpdating(state.messageData);
export const getIsSavingDraft = (state) =>
  messageSelectors.getIsSavingDraft(state.messageData);
export const getMode = (state) => messageSelectors.getMode(state.messageData);

export const getDeletingMessages = (state) =>
  messageSelectors.getDeletingMessages(state.messageData);
export const getArchivingMessages = (state) =>
  messageSelectors.getArchivingMessages(state.messageData);
export const getUnarchivingMessages = (state) =>
  messageSelectors.getUnarchivingMessages(state.messageData);
export const getReadingMessages = (state) =>
  messageSelectors.getReadingMessages(state.messageData);
export const getActiveTab = (state) =>
  messageSelectors.getActiveTab(state.messageData);

export const getFailedUpdateType = (state) =>
  errorSelectors.getFailedUpdateType(state.errors);
export const getFailedReq = (state) =>
  errorSelectors.getFailedReq(state.errors);
export const getMessageError = (state, status) =>
  errorSelectors.getMessageError(state.errors, status);
export const getFetchError = (state) =>
  errorSelectors.getFetchError(state.errors);

export const selectors = {
  getMessages,
  getShowSuccessModal,
  getUpdating,
  getFetching,
  getFetched,
  getIsSavingDraft,
  getFailedUpdateType,
  getFailedReq,
  getFetchError,
  getMessageError,
  getDeletingMessages,
  getArchivingMessages,
  getUnarchivingMessages,
  getReadingMessages,
  getMode,
  getActiveTab,
};
