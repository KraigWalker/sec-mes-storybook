
import AppConstants from '../constants/AppConstants';
/**
 *
 * @param {*} state
 * @param {*} action
 */

export default function reducer(state = {
	messages: [],
	fetching: false,
	fetched: false,
	error: false,
	successModal: false,
	activeTab: 'inbox',
	newMessageError: false,
	draftError: false,
}, action) {
	switch (action.type) {
		case AppConstants.REQUEST_SECURE_MESSAGES: {
			return { ...state, fetching: true };
		}
		case AppConstants.REQUEST_SECURE_MESSAGES_SUCCESS: {
			return { ...state, fetching: false, fetched: true, messages: action.payload };
		}
		case AppConstants.REQUEST_SECURE_MESSAGES_FAILURE: {
			return { ...state, error: true, fetched: true, fetching: false };
		}
		case AppConstants.REQUEST_TAB_ACTIVE: {
			return { ...state, activeTab: action.payload };
		}
		case AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS: {
			return { ...state, fetched: false, successModal: true };
		}
		case AppConstants.ERROR_BACK_BUTTON: {
			return { ...state, error: false, fetched: false };
		}
		case AppConstants.UPDATE_SECURE_MESSAGE_DRAFT_FAILURE: {
			return { ...state, draftError: true, fetched: true };
		}
		case AppConstants.UPDATE_NEW_SECURE_MESSAGE_FAILURE: {
			return { ...state, newMessageError: true, fetched: true };
		}
		case AppConstants.SET_POPUP_STATE: {
			return { ...state, error: false, successModal: false, newMessageError: false, draftError: false };
		}
		default:
			return state;
	}
}
