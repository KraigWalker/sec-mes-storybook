import AppConstants from '../constants/AppConstants';
/**
 * 
 * @param {*} state 
 * @param {*} action 
 */

function reducer(state={
    subjects: [],
    fetching: false,
    fetched: false,
    error: false,
}, action) {

  switch (action.type) {
    case AppConstants.REQUEST_SECURE_MESSAGES: {
      return {...state, fetching: true }
    }
    case AppConstants.REQUEST_SUBJECTS_SUCCESS: {
      return {...state, fetching : false, fetched: true, subjects: action.payload}
    }
    case AppConstants.REQUEST_SUBJECTS_FAILURE: {
      return {...state, error : true, fetched: true}
    }
   default:
    return state;
  }
}
export default reducer;
