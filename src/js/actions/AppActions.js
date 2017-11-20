import AppApi from '../api/AppApi.js';
import AppConstants from '../constants/AppConstants';
import { parseMessages } from '../parsers/MessageParser';

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

export function getActiveTab(activeTab) {
  return function(dispatch) {
      const payload = {
        type: AppConstants.REQUEST_TAB_ACTIVE,
        payload: activeTab
      }
      dispatch(payload);
  }
}

