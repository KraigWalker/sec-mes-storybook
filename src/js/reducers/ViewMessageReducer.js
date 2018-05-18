import AppConstants from '../constants/AppConstants';
/**
 *
 * @param {*} state
 * @param {*} action
 */

function reducer(state = {
	messageDetail: {},
	delSuccessModal: false,
}, action) {
	switch (action.type) {
		case AppConstants.SET_VIEW_MESSAGE_DETAIL: {
			return { ...state, messageDetail: action.payload };
		}
		case AppConstants.GET_VIEW_MESSAGE_DETAIL: {
			return { ...state };
		}
		case AppConstants.DELETE_SECURE_MESSAGE_SUCCESS: {
			return { ...state, delSuccessModal: true };
		}
		case AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS: {
			return { ...state, delSuccessModal: false };
		}
		case AppConstants.SET_POPUP_STATE: {
			return { ...state, delSuccessModal: false };
		}
		default:
			return state;
	}
}
export default reducer;
