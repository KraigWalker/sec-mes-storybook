
import AppConstants from '../constants/AppConstants';
/**
 * 
 * @param {*} state 
 * @param {*} action 
 */

export default function reducer(state={
    accessibilityMessage:'',
}, action) {

  switch (action.type) {
    case AppConstants.SEND_MESSAGE_FOR_ACCESSIBILITY: {
      return {...state, accessibilityMessage:action.payload}
    }
   default:
    return state;
  }
}
