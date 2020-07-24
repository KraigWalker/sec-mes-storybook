import AppConstants from '../constants/AppConstants';
import { parseMessages } from '../parsers/MessageParser';
import { parseSubjects, parseAccounts } from '../parsers/MessageSubjectParser';
import { buildFetchHandlers, buildUpdateHandlers, buildOptimisticUpdate } from './common';

export function fetchSecureMessages() {
  return function(dispatch, _, { secureMessagesApi }) {
    const payload = {
      type: AppConstants.REQUEST_SECURE_MESSAGES,
    };
    dispatch(payload);
    const { success, error } = buildFetchHandlers({
      dispatch,
      successActionType: AppConstants.REQUEST_SECURE_MESSAGES_SUCCESS,
      errorActionType: AppConstants.REQUEST_SECURE_MESSAGES_FAILURE,
      parseMethod: parseMessages,
    });

    secureMessagesApi.fetchSecureMessages(success, error);
  };
}
export function getMessageSubjects() {
  return function(dispatch, _, { secureMessagesApi }) {
    const { success, error } = buildFetchHandlers({
      dispatch,
      successActionType: AppConstants.REQUEST_SUBJECTS_SUCCESS,
      errorActionType: AppConstants.REQUEST_SUBJECTS_FAILURE,
      parseMethod: parseSubjects,
    });

    secureMessagesApi.getSubjects(success, error);
  };
}
export function getAccounts() {
  return function(dispatch, _, { secureMessagesApi }) {
    const { success, error } = buildFetchHandlers({
      dispatch,
      successActionType: AppConstants.REQUEST_ACCOUNTS_SUCCESS,
      errorActionType: AppConstants.REQUEST_ACCOUNTS_FAILURE,
      parseMethod: parseAccounts,
    });
    secureMessagesApi.getAccounts(success, error);
  };
}

export function getActiveTab(activeTab) {
  return function(dispatch) {
    const payload = {
      type: AppConstants.REQUEST_TAB_ACTIVE,
      payload: activeTab,
    };
    dispatch(payload);
  };
}

const dispatchUpdating = ({ dispatch, status }) => {
  const payload = {
    type: AppConstants.UPDATE_SECURE_MESSAGE,
    status,
  };
  dispatch(payload);
};

const buildMessageUpdateAction = ({ id, status, successActionType, errorActionType, updateMethod }) => (dispatch, _, { secureMessagesApi }) => {
  dispatchUpdating({ status, dispatch });

  const { success, error } = buildUpdateHandlers({
    dispatch,
    id,
    status,
    successActionType,
    errorActionType,
    onSuccess: () => dispatch(fetchSecureMessages()),
  });

  updateMethod(secureMessagesApi, success, error);
};

export const createNewMessage = ({ requestData, ids, status, name }) =>
  buildMessageUpdateAction({
    status,
    successActionType: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
    errorActionType: AppConstants.UPDATE_NEW_SECURE_MESSAGE_FAILURE,
    updateMethod: (secureMessagesApi, success, error) => {
      secureMessagesApi.createNewMessage({
        ids,
        requestData,
        status,
        name,
        success,
        error,
      });
    },
  });

export const updateDraftMessage = ({ requestData, status }) =>
  buildMessageUpdateAction({
    id: requestData.id,
    status,
    successActionType: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
    errorActionType: AppConstants.UPDATE_SECURE_MESSAGE_DRAFT_FAILURE,
    updateMethod: (secureMessagesApi, success, error) => {
      secureMessagesApi.updateExistingMessage({
        requestData,
        status,
        success,
        error,
      });
    },
  });

export function setViewMessageDetail(messageDetail) {
  return function(dispatch) {
    const payload = {
      payload: messageDetail,
      type: AppConstants.SET_VIEW_MESSAGE_DETAIL,
    };
    dispatch(payload);
  };
}

export const delMessageData = buildOptimisticUpdate(AppConstants.DELETE_SECURE_MESSAGE);
export const archiveMessageData = buildOptimisticUpdate(AppConstants.ARCHIVE_SECURE_MESSAGE);
export const unarchiveMessageData = buildOptimisticUpdate(AppConstants.UNARCHIVE_SECURE_MESSAGE);
export const setMessageRead = buildOptimisticUpdate(AppConstants.SET_SECURE_MESSAGE_READ);

export const retryUpdateRequest = (actionType, failedReq) => buildOptimisticUpdate(actionType)(failedReq);

export function sendMessageForAccessibiltiy(message) {
  return function(dispatch) {
    const payload = {
      payload: message,
      type: AppConstants.SEND_MESSAGE_FOR_ACCESSIBILITY,
    };
    dispatch(payload);
  };
}

export function popupState() {
  return function(dispatch) {
    const payload = {
      type: AppConstants.SET_POPUP_STATE,
    };
    dispatch(payload);
  };
}

export function closeDelModal() {
  return function(dispatch) {
    const payload = {
      type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
    };
    dispatch(payload);
  };
}

export function setMode(mode) {
  return {
    type: AppConstants.SET_MODE,
    payload: mode,
  };
}
