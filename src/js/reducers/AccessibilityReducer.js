import AppConstants from '../constants/AppConstants';

const initialState = { message: '' };

/**
 *
 * @param {*} state
 * @param {*} action
 */
function accessibilityReducer(state = initialState, action) {
  // Not enough actions to warrant creating a switch statement at this point.
  if (action.type === AppConstants.SEND_MESSAGE_FOR_ACCESSIBILITY) {
    return { ...state, message: action.payload };
  }
  return state;
}

export { accessibilityReducer };
