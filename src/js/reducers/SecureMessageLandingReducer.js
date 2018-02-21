
import AppConstants from '../constants/AppConstants';
/**
 * 
 * @param {*} state 
 * @param {*} action 
 */

export default function reducer(state={
    messages: [],
    fetching: false,
    fetched: false,
    error: false,
    successModal: false,
    activeTab: 'inbox',
    navRef: '',
}, action) {

  switch (action.type) {
    case AppConstants.REQUEST_SECURE_MESSAGES: {
      return {...state, fetching: true }
    }
    case AppConstants.REQUEST_SECURE_MESSAGES_SUCCESS: {
      return {...state, fetching : false, fetched: true, messages: action.payload}
    }
    case AppConstants.REQUEST_SECURE_MESSAGES_FAILURE: {
      return {...state, error: true, fetched: true}
    }
    case AppConstants.REQUEST_TAB_ACTIVE: {
      return {...state, activeTab: action.payload}
    }
    case AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS: {
      return {...state, fetched: false, successModal: true }
    }
    case AppConstants.ERROR_BACK_BUTTON: {
      return {...state, error: false, fetched: false}
    }
    case AppConstants.NAVIGATION_REF: {
     return {...state, error:false, fetched: true, navRef: action.payload} 
    }
   default:
    return state;
  }
}
