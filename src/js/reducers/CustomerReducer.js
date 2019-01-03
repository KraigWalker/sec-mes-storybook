import AppConstants from '../constants/AppConstants';
/**
 *
 * @param {*} state
 * @param {*} action
 */

export default function reducer(state = {
    customerDetails: [],
    fetching: false,
    fetched: false,
    error: false,
}, action) {
    switch (action.type) {
        case AppConstants.REQUEST_CUSTOMER_NAME: {
            return { ...state, fetching: true };
        }
        case AppConstants.REQUEST_CUSTOMER_NAME_SUCCESS: {
            return { ...state, fetching: false, fetched: true, customerDetails: action.payload };
        }
        case AppConstants.REQUEST_CUSTOMER_NAME_FAILURE: {
            return { ...state, error: true, fetched: true, fetching: false };
        }
        case AppConstants.SET_POPUP_STATE: {
            return { ...state, error: false }
        }
        default:
            return state;
    }
}