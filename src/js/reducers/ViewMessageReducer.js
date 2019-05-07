import AppConstants from '../constants/AppConstants';
import {NO_MODAL, DELETE_MODAL, ARCHIVE_MODAL, UNARCHIVE_MODAL} from '../constants/ModalConstants';
/**
 *
 * @param {*} state
 * @param {*} action
 */

function reducer(state = {
	messageDetail: {},
	modalType: NO_MODAL
}, action) {
	switch (action.type) {
		case AppConstants.SET_VIEW_MESSAGE_DETAIL: {
			return { ...state, messageDetail: action.payload };
		}
		case AppConstants.GET_VIEW_MESSAGE_DETAIL: {
			return { ...state };
		}
		case AppConstants.DELETE_SECURE_MESSAGE_SUCCESS: {
			return { ...state, modalType: DELETE_MODAL};
		}
		case AppConstants.ARCHIVE_SECURE_MESSAGE_SUCCESS: {
			return { ...state, modalType: ARCHIVE_MODAL };
		}
		case AppConstants.UNARCHIVE_SECURE_MESSAGE_SUCCESS: {
			return { ...state, modalType: UNARCHIVE_MODAL};
		}
		case AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS: {
			return { ...state, modalType: NO_MODAL};
		}
		case AppConstants.SET_POPUP_STATE: {
			return { ...state, modalType: NO_MODAL };
		}
		default:
			return state;
	}
}
export default reducer;


const getMessageDetail = (state) => state.messageDetail;
	
export const selectors = {
	getMessageDetail,
}


