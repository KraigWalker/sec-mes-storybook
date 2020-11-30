import AppConstants from '../../constants/AppConstants';
import { NEW, DRAFT } from '../../constants/StringsConstants';

const initialState = {
  error: false,
  newMessageError: false,
  draftError: false,
  failedUpdateType: undefined,
  failedReq: undefined,
};

export default function reducer(
  state = {
    ...initialState,
  },
  action
) {
  switch (action.type) {
    case AppConstants.ARCHIVE_SECURE_MESSAGE_FAILURE: {
      return {
        ...state,
        failedUpdateType: AppConstants.ARCHIVE_SECURE_MESSAGE,
        failedReq: action.payload.requestData,
      };
    }
    case AppConstants.UNARCHIVE_SECURE_MESSAGE_FAILURE: {
      return {
        ...state,
        failedUpdateType: AppConstants.UNARCHIVE_SECURE_MESSAGE,
        failedReq: action.payload.requestData,
      };
    }
    case AppConstants.DELETE_SECURE_MESSAGE_FAILURE: {
      return {
        ...state,
        failedUpdateType: AppConstants.DELETE_SECURE_MESSAGE,
        failedReq: action.payload.requestData,
      };
    }
    case AppConstants.REQUEST_SECURE_MESSAGES_SUCCESS: {
      return { ...state, error: false };
    }
    case AppConstants.REQUEST_SECURE_MESSAGES_FAILURE: {
      return { ...state, error: true };
    }
    case AppConstants.UPDATE_SECURE_MESSAGE_SUCCESS: {
      return { ...state, draftError: false, newMessageError: false };
    }
    case AppConstants.UPDATE_SECURE_MESSAGE_DRAFT_FAILURE: {
      return { ...state, draftError: true };
    }
    case AppConstants.UPDATE_NEW_SECURE_MESSAGE_FAILURE: {
      return { ...state, newMessageError: true };
    }
    case AppConstants.SET_POPUP_STATE: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}

const getMessageError = (state, status) => {
  switch (status) {
    case NEW:
      return state.newMessageError;
    case DRAFT:
    default:
      return state.draftError;
  }
};

const getFailedUpdateType = (state) => state.failedUpdateType;
const getFailedReq = (state) => state.failedReq;
const getFetchError = (state) => state.error;

export const selectors = {
  getMessageError,
  getFailedUpdateType,
  getFailedReq,
  getFetchError,
};
