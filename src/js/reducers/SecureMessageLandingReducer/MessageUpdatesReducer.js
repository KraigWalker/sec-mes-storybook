import AppConstants from '../../constants/AppConstants';
import { DRAFT } from '../../constants/StringsConstants';

export default function reducer(
  state = {
    messages: [],
    fetching: false,
    isSavingDraft: false,
    fetched: false,
    updating: false,
    updated: false,
    successModal: false,
    activeTab: 'inbox',
    deletingMessages: [],
    archivingMessages: [],
    unarchivingMessages: [],
    readingMessages: [],
  },
  action
) {
  switch (action.type) {
    case AppConstants.ARCHIVE_SECURE_MESSAGE_SUCCESS: {
      return {
        ...state,
        unarchivingMessages: state.unarchivingMessages.filter(
          (m) => m.id === action.payload.id
        ),
        archivingMessages: [...state.archivingMessages, action.payload.id],
      };
    }
    case AppConstants.UNARCHIVE_SECURE_MESSAGE_SUCCESS: {
      return {
        ...state,
        archivingMessages: state.archivingMessages.filter(
          (m) => m.id === action.payload.id
        ),
        unarchivingMessages: [...state.unarchivingMessages, action.payload.id],
      };
    }
    case AppConstants.DELETE_SECURE_MESSAGE_SUCCESS: {
      return {
        ...state,
        deletingMessages: [...state.deletingMessages, action.payload.id],
      };
    }
    case AppConstants.UPDATE_SECURE_MESSAGE: {
      return {
        ...state,
        updating: action.status !== DRAFT,
        isSavingDraft: action.status === DRAFT,
      };
    }
    case AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS: {
      return {
        ...state,
        successModal: true,
        updating: false,
        fetched: false,
        isSavingDraft: false,
      };
    }
    case AppConstants.SET_SECURE_MESSAGE_READ_SUCCESS: {
      return {
        ...state,
        readingMessages: [...state.readingMessages, action.payload.id],
      };
    }
    case AppConstants.REQUEST_SECURE_MESSAGES: {
      return { ...state, fetching: true };
    }
    case AppConstants.REQUEST_SECURE_MESSAGES_SUCCESS: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        deletingMessages: [],
        archivingMessages: [],
        unarchivingMessages: [],
        readingMessages: [],
        messages: action.payload,
      };
    }
    case AppConstants.REQUEST_SECURE_MESSAGES_FAILURE:
    case AppConstants.REQUEST_ACCOUNTS_FAILURE: {
      return { ...state, fetched: true, fetching: false };
    }
    case AppConstants.REQUEST_TAB_ACTIVE: {
      return { ...state, activeTab: action.payload };
    }
    case AppConstants.UPDATE_SECURE_MESSAGE_DRAFT_FAILURE:
    case AppConstants.UPDATE_NEW_SECURE_MESSAGE_FAILURE: {
      return { ...state, updating: false, isSavingDraft: false };
    }
    case AppConstants.SET_POPUP_STATE: {
      return { ...state, successModal: false };
    }
    case AppConstants.SET_MODE: {
      return { ...state, mode: action.payload };
    }
    default:
      return state;
  }
}

const getMessages = (state) => state.messages;

const getUpdating = (state) => state.updating;

const getIsSavingDraft = (state) => state.isSavingDraft;

const getShowSuccessModal = (state) => state.successModal;

const getFetching = (state) => state.fetching;

const getFetched = (state) => state.fetched;

const getDeletingMessages = (state) => state.deletingMessages;
const getArchivingMessages = (state) => state.archivingMessages;
const getUnarchivingMessages = (state) => state.unarchivingMessages;
const getReadingMessages = (state) => state.readingMessages;

const getMode = (state) => state.mode;
const getActiveTab = (state) => state.activeTab;

export const selectors = {
  getMessages,
  getShowSuccessModal,
  getUpdating,
  getFetching,
  getFetched,
  getIsSavingDraft,
  getDeletingMessages,
  getArchivingMessages,
  getUnarchivingMessages,
  getReadingMessages,
  getMode,
  getActiveTab,
};
