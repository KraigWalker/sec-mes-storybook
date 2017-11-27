
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
    activeTab: 'inbox',
}, action) {

  switch (action.type) {
    case AppConstants.REQUEST_SECURE_MESSAGES: {
      return {...state, fetching: true }
    }
    case AppConstants.REQUEST_SECURE_MESSAGES_SUCCESS: {
      return {...state, fetching : false, fetched: true, messages: action.payload}
    }
    case AppConstants.REQUEST_TAB_ACTIVE: {
      return {...state, activeTab: action.payload}
    }
    case AppConstants.GET_SECURE_MESSAGES: {
      return {...state}
    }
   default:
    return state;
  }
}
