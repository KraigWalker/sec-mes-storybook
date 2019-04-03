import AppConstants from '../constants/AppConstants';
/**
 *
 * @param {*} state
 * @param {*} action
 */

export default function reducer(state = {
	segmentData: [],
	fetching: false,
	fetched: false,
}, action) {
	switch (action.type) {
		case AppConstants.REQUEST_SEGMENT_DATA: {
			return { ...state, fetching: true };
		}
		case AppConstants.REQUEST_SEGMENTS_SUCCESS: {
			return { ...state, fetching: false, fetched: true, segmentData: action.payload };
		}
		default:
			return state;
	}
}

//DEBT: this seems incorrect - as segmentData is an array, but this is what the existing code is doing...
const getCustomerId = (state) => state.segmentData.customers[0].id;

export const selectors = {
	getCustomerId
}