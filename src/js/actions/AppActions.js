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
      const payload = {
        type: AppConstants.REQUEST_SECURE_MESSAGES_FAILURE,
      }
      dispatch(payload);
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
  return function(dispatch) {
    const success = (response) => {
      const payload = {
        type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS,
   //     payload: {response: response, requestData: requestData} will remove after error scenarios
      }
      dispatch(payload);
    }
    const error = (error) => {
      console.log(error);
    }
    AppApi.sendMessageData(requestData,success,error);
  }
}

export function updateMessageData(requestData, id, status) {
  return function(dispatch) {
    const success = () => {
      const payload = {
        type: AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS
      }
      dispatch(payload);
    }
    const error = (error) => {
      console.log(error);
    }
    AppApi.updateMessageData(requestData,id,status,success,success);
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

export function sendMessageForAccessibiltiy(message) {
  return function(dispatch) {
      const payload = {
        payload: message,
        type: AppConstants.SEND_MESSAGE_FOR_ACCESSIBILITY,
    }
    dispatch(payload);
  }
}