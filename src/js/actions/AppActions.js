import AppApi from '../api/AppApi.js';
import AppConstants from '../constants/AppConstants';
import { parseMessages } from '../parsers/MessageParser';
import {parseSubjects,parseAccounts} from '../parsers/MessageSubjectParser';

export function fetchSecureMessages() {
  return function(dispatch) {
    const payload = {
      type: AppConstants.REQUEST_SECURE_MESSAGES,
    };
    dispatch(payload);
    const success = (response) => {
      const parseData = parseMessages(response);
      const payload = {
        type: AppConstants.REQUEST_SECURE_MESSAGES_SUCCESS,
        payload: parseData
      }
      dispatch(payload);
    }
    const error = (error) => {
      console.log(error);
    }
    AppApi.fetchSecureMessages(success, error);
  }
}
export function getMessageSubjects() {
  return function(dispatch) {
  const success = (response) => {
    const parseData = parseSubjects(response);
    const payload = {
      type: AppConstants.REQUEST_SUBJECTS_SUCCESS,
      payload: parseData
    }
    dispatch(payload);
  }
  const error = (error) => {
    console.log(error);
  }
  AppApi.getSubjects(success, error);
}
}
export function getAccounts() {
  return function(dispatch) {
    const success = (response) => {
      const parseData = parseAccounts(response);
      const payload = {
        type: AppConstants.REQUEST_ACCOUNTS_SUCCESS,
        payload: parseData
      }
      dispatch(payload);
    }
    const error = (error) => {
      console.log(error);
    }
    AppApi.getAccounts(success,error);
  }
}

export function getActiveTab(activeTab) {
  return function(dispatch) {
      const payload = {
        type: AppConstants.REQUEST_TAB_ACTIVE,
        payload: activeTab
      }
      dispatch(payload);
  }
}
export function sendMessageData(requestData) {
  console.log(requestData);
  return function(dispatch) {
    const success = (response) => {
      console.log(response.status);
      // const parseData = parseAccounts(response);
      const payload = {
        type: AppConstants.SEND_MESSAGE_DATA_SUCCESS,
        payload: {response: response, requestData: requestData}
      }
      dispatch(payload);
    }
    const error = (error) => {
      console.log(error);
    }
    AppApi.sendMessageData(requestData,success,error);
  }
}

export function updateMessageData(requestData, id) {
  console.log(requestData);
  //console.log(id);
  return function(dispatch) {
    const success = (response) => {
      console.log(response.status);
      console.log(requestData);
      // const parseData = parseAccounts(response);
      const payload = {
        type: AppConstants.UPDATE_MESSAGE_DATA_SUCCESS,
        payload: {response: response, requestData: requestData}
      }
      dispatch(payload);
    }
    const error = (error) => {
      console.log(error);
    }
    AppApi.updateMessageData(requestData,id,success,error);
  }
}

export function getSecureMessages() {
  return function(dispatch) {
      const payload = {
        type: AppConstants.GET_SECURE_MESSAGES,
    }
    dispatch(payload);
  }
}

export function setViewMessageDetail(messageDetail) {
  return function(dispatch) {
      const payload = {
        payload: messageDetail,
        type: AppConstants.SET_VIEW_MESSAGE_DETAIL,
    }
    dispatch(payload);
  }
}

export function getViewMessageDetail() {
  return function(dispatch) {
      const payload = {
        type: AppConstants.GET_VIEW_MESSAGE_DETAIL,
    }
    dispatch(payload);
  }
}

export function updateMessage(requestData, messages) {
  console.log(requestData);
  console.log(messages);
  return function(dispatch) {
    /**
     * Temporary dispach added - UPDATE_SECURE_MESSAGE_SUCCESS need to be called from success. (after actual service integration.)
     */
      const payload = {
        payload : {messages, requestData},
        type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
    }
    dispatch(payload);
    const success = (response) => {
      // const parseData = parseMessages(response);
      // const payload = {
        // type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
        // payload: response
      // }
      // dispatch(payload);
      console.log(response);
    }
    const error = (error) => {
      console.log(error);
    }
    AppApi.updateMessage(requestData,success, error);
  }
}
export function sendDeleteData(deleteData) {
  return function(dispach) {
    const success = (response) => {
      // const parseData = parseAccounts(response);
      const payload = {
        type: AppConstants.SEND_DELETE_MESSAGE_DATA,
        payload: response
      }
      //dispatch(payload);
    }
    const error = (error) => {
      console.log(error);
    }
    AppApi.sendDeleteMessageData(deleteData,success,error);
  }
  
}
export function sendDraftMessageData(draftData){
  return function(dispach) {
    const success = (response) => {
      // const parseData = parseAccounts(response);
      const payload = {
        type: AppConstants.SEND_DELETE_MESSAGE_DATA,
        payload: response
      }
      //dispatch(payload);
    }
    const error = (error) => {
      console.log(error);
    }
    AppApi.sendDraftMessageData(draftData,success,error);
  }
}
export function sendMessageForAccessibiltiy(message) {
  return function(dispatch) {
      const payload = {
        payload: message,
        type: AppConstants.SEND_MESSAGE_FOR_ACCESSIBILITY,
    }
    dispatch(payload);
  }
}