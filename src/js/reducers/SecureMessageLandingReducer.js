
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
    case AppConstants.REQUEST_DATA: {
      return {...state, fetching: true }
    }
    case AppConstants.REQUEST_DATA_SUCCESS: {
      return {...state, fetching : false, fetched: true, messages: action.payload}
    }
    case AppConstants.REQUEST_TAB_ACTIVE: {
      const newState=Object.assign({},state);
      newState.activeTab=action.payload;
      return newState;
    }
   default:
    return state;
  }
}
