
import AppConstants from '../constants/AppConstants';
/**
 * 
 * @param {*} state 
 * @param {*} action 
 */

export default function reducer(state={
    accounts: []
}, action) {

  switch (action.type) {
    case AppConstants.REQUEST_DATA: {
      return {...state, fetching: true }
    }
    case AppConstants.REQUEST_ACCOUNTS_SUCCESS: {
      return {...state, accounts: action.payload}
    }
   default:
    return state;
  }
}
