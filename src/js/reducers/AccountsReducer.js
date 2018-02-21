
import AppConstants from '../constants/AppConstants';
/**
 * 
 * @param {*} state 
 * @param {*} action 
 */

export default function reducer(state={
    accounts: [],
    fetching:false,
    fetched:false,
}, action) {

  switch (action.type) {
    case AppConstants.REQUEST_SECURE_MESSAGES: {
      return {...state, fetching: true }
    }
    case AppConstants.REQUEST_ACCOUNTS_SUCCESS: {
      return {...state, accounts: action.payload,fetched:true,fetching: false}
    }
   default:
    return state;
  }
}
