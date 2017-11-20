import AppApi from '../api/AppApi.js';
import AppConstants from '../constants/AppConstants';
import { parseMessages } from '../parsers/MessageParser';
import {parseSubjects,parseAccounts} from '../parsers/MessageSubjectParser';

export function getSecureMessages() {
  return function(dispatch) {
    const payload = {
      type: AppConstants.REQUEST_DATA,
    };
    dispatch(payload);
    const success = (response) => {
      const parseData = parseMessages(response);
      const payload = {
        type: AppConstants.REQUEST_DATA_SUCCESS,
        payload: parseData
      }
      dispatch(payload);
    }
    const error = (error) => {
      console.log(error);
    }
    AppApi.getSecureMessages(success, error);
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

