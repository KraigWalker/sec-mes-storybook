
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
}, action) {

  switch (action.type) {
    case AppConstants.REQUEST_DATA: {
      return {...state, fetching: true }
    }
    case AppConstants.REQUEST_DATA_SUCCESS: {
      return {...state, fetching : false, fetched: true, messages: action.payload}
    }
   default:
    return state;
  }
}
