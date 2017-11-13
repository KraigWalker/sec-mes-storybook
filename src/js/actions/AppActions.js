import AppApi from '../api/AppApi.js';
import AppConstants from '../constants/AppConstants';


export function getSecureMessages() {
  return function(dispatch) {
    const payload = {
      type: AppConstants.REQUEST_DATA,
    };
    dispatch(payload);
    const success = (response) => {
      const payload = {
        type: AppConstants.REQUEST_DATA_SUCCESS,
        payload: response
      }
      dispatch(payload);
    }
    const error = (error) => {
      console.log(error);
    }
    AppApi.getSecureMessages(success, error);
  }
}

