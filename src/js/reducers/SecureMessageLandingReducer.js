import AppConstants from '../constants/AppConstants';
import {NEW, DRAFT} from "../constants/StringsConstants";
import {strictEqual} from 'assert';

/**
 *
 * @param {*} state
 * @param {*} action
 */

export default function reducer(state = {
    messages: [],
    fetching: false,
    fetched: false,
    updating: false,
    updated: false,
    error: false,
    successModal: false,
    activeTab: 'inbox',
    newMessageError: false,
    draftError: false,
    sendingMessages: [],
    deletingMessages: [],
}, action) {
    switch (action.type) {
        case AppConstants.SENDING_MESSAGE: {
            return {...state, sendingMessages: [...state.sendingMessages, action.payload]}
        }
        case AppConstants.DELETING_MESSAGE: {
            console.log(state, action.payload)
            return {...state, deletingMessages: [...state.deletingMessages, action.payload]}
        }
        case AppConstants.REQUEST_SECURE_MESSAGES: {
            return {...state, fetching: true};
        }
        case AppConstants.REQUEST_SECURE_MESSAGES_SUCCESS: {
            return {...state, fetching: false, fetched: true, messages: action.payload};
        }
        case AppConstants.REQUEST_SECURE_MESSAGES_FAILURE: {
            return {...state, error: true, fetched: true, fetching: false};
        }
        case AppConstants.REQUEST_TAB_ACTIVE: {
            return {...state, activeTab: action.payload};
        }
        case AppConstants.UPDATE_SECURE_MESSAGE: {
            return {...state, updating: action.status !== DRAFT, isSavingDraft: action.status === DRAFT}
        }
        case AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS: {
            return {...state, fetched: false, successModal: true, updating: false, isSavingDraft: false};
        }
        case AppConstants.ERROR_BACK_BUTTON: {
            return {...state, error: false, fetched: false};
        }
        case AppConstants.UPDATE_SECURE_MESSAGE_DRAFT_FAILURE: {
            return {...state, draftError: true, fetched: true, fetching: false, isSavingDraft: false};
        }
        case AppConstants.UPDATE_NEW_SECURE_MESSAGE_FAILURE: {
            return {...state, newMessageError: true, fetched: true, fetching: false, isSavingDraft: false};
        }
        case AppConstants.SET_POPUP_STATE: {
            return {...state, error: false, successModal: false, newMessageError: false, draftError: false};
        }
        case AppConstants.SET_MODE: {
            return {...state, mode: action.payload}
        }
        default:
            return state;
    }
}

const getMessages = (state) => state.messages;

const getUpdating = (state) => state.updating;

const getIsSavingDraft = state => state.isSavingDraft;

const getMessageError = (state, status) => {
    switch (status) {
        case NEW:
            return state.newMessageError;
        case DRAFT:
        default:
            return state.draftError;
    }
};

const getShowSuccessModal = (state) => state.successModal;

export const selectors = {
    getMessages,
    getMessageError,
    getShowSuccessModal,
    getUpdating,
    getIsSavingDraft,
};
