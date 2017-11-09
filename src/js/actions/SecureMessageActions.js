import SecureMessagesApi from '../api/SecureMessagesApi.js';
import SecureMessagesParser from '../parsers/SecureMessagesParser.js';

export function getSecureMessages(meoData) {
  return function(dispatch) {
    dispatch ({ type: "REQUEST_SECURE_MESSAGES" });
    const success = (response) => {
      // console.log(response);
      const responseParsed = SecureMessagesParser.mapSecureMessages(response);
      dispatch({
        type : "REQUEST_SECURE_MESSAGES_SUCCESS",
        payload: responseParsed,
      });
    };
    const error = (response) => {
      // console.log(response);
      
      if(response.status == 401){
        dispatch({
        type : "REQUEST_SECURE_MESSAGES_ACCESS_ERROR",
        payload: response,
        });
      } else {
        dispatch({
        type : "REQUEST_SECURE_MESSAGES_TECH_ERROR",
        payload: response,
        });
      }
    };
    SecureMessagesApi.getSecureMessages(success, error, meoData);
  }
}
