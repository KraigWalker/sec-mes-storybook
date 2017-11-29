import AppConstants from '../constants/AppConstants';
/**
 * 
 * @param {*} state 
 * @param {*} action 
 */

function reducer(state={
    messageDetail:{}
}, action) {

  switch (action.type) {
    case AppConstants.SET_VIEW_MESSAGE_DETAIL: {
        state = Object.assign({}, state, {messageDetail:action.payload})
    }
    case AppConstants.GET_VIEW_MESSAGE_DETAIL: {
        return {...state}
      }
   default:
    return state;
  }
}
export default reducer;
