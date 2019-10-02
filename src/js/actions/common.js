import { DELETED, ARCHIVED, READ } from "../constants/StringsConstants";
import AppConstants from "../constants/AppConstants";

export const buildFetchHandlers = ({
  dispatch,
  successActionType,
  errorActionType,
  parseMethod
}) => ({
  success: response => {
    const parseData = response ? parseMethod(response) : [];
    const payload = {
      type: successActionType,
      payload: parseData
    };
    dispatch(payload);
  },
  error: error => {
    const payload = {
      type: errorActionType,
      payload: error
    };
    dispatch(payload);
  }
});

export const buildUpdateHandlers = ({
  id,
  dispatch,
  requestData,
  status,
  successActionType,
  errorActionType,
  onSuccess = () => {}
}) => ({
  success: response => {
    const payload = {
      type: successActionType,
      payload: {
        status,
        id
      }
    };
    dispatch(payload);
    onSuccess();
  },
  error: error => {
    console.log(error);
    const payload = {
      type: errorActionType,
      payload: {
        error,
        requestData
      }
    };
    dispatch(payload);
  }
});

const statusMap = {
    [AppConstants.ARCHIVE_SECURE_MESSAGE]: ARCHIVED,
    [AppConstants.UNARCHIVE_SECURE_MESSAGE]: READ,
    [AppConstants.DELETE_SECURE_MESSAGE]: DELETED,
    [AppConstants.SET_SECURE_MESSAGE_READ] : READ
  };

export const buildOptimisticUpdate = action => requestData => (
  dispatch,
  _,
  { secureMessagesApi }
) => {
  const { success, error } = buildUpdateHandlers({
    id: requestData.id,
    requestData,
    dispatch,
    successActionType: `${action}_SUCCESS`,
    errorActionType: `${action}_FAILURE`
  });

  secureMessagesApi.updateExistingMessage({
    requestData,
    status: statusMap[action],
    success,
    error
  });
};
