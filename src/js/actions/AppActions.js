import AppConstants from "../constants/AppConstants";
import { parseMessages } from "../parsers/MessageParser";
import { parseSubjects, parseAccounts } from "../parsers/MessageSubjectParser";

export function fetchSecureMessages() {
  return function(dispatch, _, { secureMessagesApi }) {
    const payload = {
      type: AppConstants.REQUEST_SECURE_MESSAGES
    };
    dispatch(payload);
    const success = response => {
      const parseData = response ? parseMessages(response) : [];
      const payload = {
        type: AppConstants.REQUEST_SECURE_MESSAGES_SUCCESS,
        payload: parseData
      };
      dispatch(payload);
    };
    const error = error => {
      const payload = {
        type: AppConstants.REQUEST_SECURE_MESSAGES_FAILURE
      };
      dispatch(payload);
    };
    secureMessagesApi.fetchSecureMessages(success, error);
  };
}
export function getMessageSubjects() {
  return function(dispatch, _, { secureMessagesApi }) {
    const success = response => {
      const parseData = parseSubjects(response);
      const payload = {
        type: AppConstants.REQUEST_SUBJECTS_SUCCESS,
        payload: parseData
      };
      dispatch(payload);
    };
    const error = error => {
      const payload = {
        type: AppConstants.REQUEST_SUBJECTS_FAILURE,
        payload: error
      };
      dispatch(payload);
    };
    secureMessagesApi.getSubjects(success, error);
  };
}
export function getAccounts() {
  return function(dispatch, _, { secureMessagesApi }) {
    const success = response => {
      const parseData = parseAccounts(response);
      const payload = {
        type: AppConstants.REQUEST_ACCOUNTS_SUCCESS,
        payload: parseData
      };
      dispatch(payload);
    };
    const error = error => {
      const payload = {
        type: AppConstants.REQUEST_SECURE_MESSAGES_FAILURE,
        payload: error
      };
      dispatch(payload);
    };
    secureMessagesApi.getAccounts(success, error);
  };
}

export function getActiveTab(activeTab) {
  return function(dispatch) {
    const payload = {
      type: AppConstants.REQUEST_TAB_ACTIVE,
      payload: activeTab
    };
    dispatch(payload);
  };
}

export function backButton() {
  return function(dispatch) {
    const payload = {
      type: AppConstants.ERROR_BACK_BUTTON
    };
    dispatch(payload);
  };
}
export function sendMessageData(requestData, status, name) {
  return function(dispatch, _, { secureMessagesApi }) {
    const payload = {
      type: AppConstants.UPDATE_SECURE_MESSAGE,
      status
    };
    dispatch(payload);
    const success = response => {
      const payload = {
        type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
        status
      };
      dispatch(payload);
    };
    const error = error => {
      const payload = {
        type: AppConstants.UPDATE_NEW_SECURE_MESSAGE_FAILURE,
        status,
        payload: error
      };
      dispatch(payload);
    };
    secureMessagesApi.sendMessageData(
      requestData,
      status,
      name,
      success,
      error
    );
  };
}

export function replyMessageData(requestData, ids, status, name) {
  return function(dispatch, _, { secureMessagesApi }) {
    const payload = {
      type: AppConstants.UPDATE_SECURE_MESSAGE,
      status
    };
    dispatch(payload);
    const success = response => {
      const payload = {
        type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
        status,
      };
      dispatch(payload);
    };
    const error = error => {
      const payload = {
        type: AppConstants.UPDATE_NEW_SECURE_MESSAGE_FAILURE,
        status,
        payload: error
      };
      dispatch(payload);
    };
    secureMessagesApi.replyMessageData(
      requestData,
      ids,
      status,
      name,
      success,
      error
    );
  };
}

export function updateMessageData(requestData, id, status) {
  return function(dispatch, _, { secureMessagesApi }) {
    const payload = {
      type: AppConstants.UPDATE_SECURE_MESSAGE,
      status
    };
    dispatch(payload);
    const success = () => {
      const payload = {
        type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
        status,
      };
      dispatch(payload);
    };
    const error = error => {
      const payload = {
        type: AppConstants.UPDATE_SECURE_MESSAGE_DRAFT_FAILURE,
        status,
        payload: error
      };
      dispatch(payload);
    };
    secureMessagesApi.updateMessageData(
      requestData,
      id,
      status,
      success,
      error
    );
  };
}
export function setViewMessageDetail(messageDetail) {
  return function(dispatch) {
    const payload = {
      payload: messageDetail,
      type: AppConstants.SET_VIEW_MESSAGE_DETAIL
    };
    dispatch(payload);
  };
}

function buildHandler(dispatch, successActionType, errorActionType) {
  return {
    success: () => {
      const payload = {
        type: successActionType
      };
      dispatch(payload);
    },
    error: error => {
      const payload = {
        type: errorActionType,
        payload: error
      };
      dispatch(payload);
    }
  };
}

export function delMessageData(requestData, id, status) {
  return function(dispatch, _, { secureMessagesApi }) {
    const { success, error } = buildHandler(
      dispatch,
      AppConstants.DELETE_SECURE_MESSAGE_SUCCESS,
      AppConstants.UPDATE_SECURE_MESSAGE_DRAFT_FAILURE
    );
    secureMessagesApi.updateMessageData(
      requestData,
      id,
      status,
      success,
      error
    );
  };
}

export function archiveMessageData(requestData, id, status) {
  return function(dispatch, _, { secureMessagesApi }) {
    const { success, error } = buildHandler(
      dispatch,
      AppConstants.ARCHIVE_SECURE_MESSAGE_SUCCESS,
      AppConstants.ARCHIVE_SECURE_MESSAGE_FAILURE
    );
    secureMessagesApi.updateMessageData(
      requestData,
      id,
      status,
      success,
      error
    );
  };
}

export function unarchiveMessageData(requestData, id, status) {
  return function(dispatch, _, { secureMessagesApi }) {
    const { success, error } = buildHandler(
      dispatch,
      AppConstants.UNARCHIVE_SECURE_MESSAGE_SUCCESS,
      AppConstants.UNARCHIVE_SECURE_MESSAGE_FAILURE
    );
    secureMessagesApi.updateMessageData(
      requestData,
      id,
      status,
      success,
      error
    );
  };
}

export function sendMessageForAccessibiltiy(message) {
  return function(dispatch) {
    const payload = {
      payload: message,
      type: AppConstants.SEND_MESSAGE_FOR_ACCESSIBILITY
    };
    dispatch(payload);
  };
}

export function popupState() {
  return function(dispatch) {
    const payload = {
      type: AppConstants.SET_POPUP_STATE
    };
    dispatch(payload);
  };
}

export function closeDelModal() {
  return function(dispatch) {
    const payload = {
      type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS
    };
    dispatch(payload);
  };
}

export function getCustomerID() {
  return function(dispatch, _, { secureMessagesApi }) {
    const payload = {
      type: AppConstants.REQUEST_SEGMENT_DATA
    };
    dispatch(payload);
    const success = response => {
      const payload = {
        type: AppConstants.REQUEST_SEGMENTS_SUCCESS,
        payload: response
      };
      dispatch(payload);
    };
    const error = error => {
      const payload = {
        type: AppConstants.REQUEST_SECURE_MESSAGES_FAILURE,
        payload: error
      };
      dispatch(payload);
    };
    secureMessagesApi.fetchAccountSegment(success, error);
  };
}

export function getCustomerName(id) {
  return function(dispatch, _, { secureMessagesApi }) {
    const payload = {
      type: AppConstants.REQUEST_CUSTOMER_NAME
    };
    dispatch(payload);
    const success = response => {
      const payload = {
        type: AppConstants.REQUEST_CUSTOMER_NAME_SUCCESS,
        payload: response
      };
      dispatch(payload);
    };
    const error = error => {
      const payload = {
        type: AppConstants.REQUEST_CUSTOMER_NAME_FAILURE,
        payload: error
      };
      dispatch(payload);
    };
    secureMessagesApi.fetchCustomerDetails(success, error, id);
  };
}

export function setDeletingMessages(id) {
  return function(dispatch) {
    const payload = {
      type: AppConstants.DELETING_MESSAGE,
      payload: id,
    };
    dispatch(payload);
  }
}

export function setSendingMessages(id) {
  return function (dispatch) {
    const payload = {
      type: AppConstants.SENDING_MESSAGE,
      payload: id,
    };
    dispatch(payload);
  }
}

export function setMode(mode) {
  return {
    type: AppConstants.SET_MODE,
    payload: mode
  };
}
