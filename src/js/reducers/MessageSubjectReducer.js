import AppConstants from '../constants/AppConstants';
import {EXCLUDED_SUBJECTS} from "../constants/StringsConstants";

/**
 *
 * @param {*} state
 * @param {*} action
 */

function reducer(state = {
    subjects: [],
    fetching: false,
    fetched: false,
    error: false,
}, action) {

    switch (action.type) {
        case AppConstants.REQUEST_SECURE_MESSAGES: {
            return {...state, fetching: true}
        }
        case AppConstants.REQUEST_SUBJECTS_SUCCESS: {
            return {
                ...state, fetching: false, fetched: true, subjects: action.payload
                // TODO: DEBT x CYBG - backend to remove flyaway adding "ND".
                    .filter(({key}) => EXCLUDED_SUBJECTS.indexOf(key))
            }
        }
        case AppConstants.REQUEST_SUBJECTS_FAILURE: {
            return {...state, error: true, fetched: true}
        }
        case AppConstants.SET_POPUP_STATE: {
            return {...state, error: false}
        }
        default:
            return state;
    }
}

export default reducer;

const getSubjects = (state) => state.subjects;
const getSubjectErrors = (state) => state.error;

export const selectors = {
    getSubjects,
    getSubjectErrors
}
