import { combineReducers } from "redux";
import messages, {selectors as messageSelectors } from "./SecureMessageLandingReducer";
import subjects, {selectors as subjectSelectors} from "./MessageSubjectReducer";
import accounts, {selectors as accountSelectors } from "./AccountsReducer";
import viewMessage, {selectors as viewMessageSelectors} from "./ViewMessageReducer";
import accessibilityReducer from "./AccessibilityReducer";
import segmentData, {selectors as segmentDataSelectors} from "./SegmentsReducer";
import customerDetails, {selectors as customerSelectors } from "./CustomerReducer";
import { reducer as documentManagement } from "document-management-web-ui";

export default combineReducers({
  messages,
  subjects,
  accounts,
  viewMessage,
  accessibilityReducer,
  segmentData,
  customerDetails,
  documentManagement
});

export const getMessages = (state) => messageSelectors.getMessages(state.messages);
export const getMessageError = (state, status) => messageSelectors.getMessageError(state,messages, status);
export const getShowSuccessModal = (state) => messageSelectors.getShowSuccessModal(state.messages);
export const getUpdating = (state) => messageSelectors.getUpdating(state.messages);
export const getIsSavingDraft = (state) => messageSelectors.getIsSavingDraft(state.messages);

export const getAccounts = (state) => accountSelectors.getAccounts(state.accounts);

export const getSubjects = (state) => subjectSelectors.getSubjects(state.subjects);
export const getSubjectErrors = (state) => subjectSelectors.getSubjectErrors(state);

export const getMessageDetail = (state) => viewMessageSelectors.getMessageDetail(state.viewMessage);

export const getCustomerDetails = (state) => customerSelectors.getCustomerDetails(state.customerDetails);
export const getCustomerError = (state) => customerSelectors.getCustomerError(state.customerDetails);

export const getCustomerId = (state) => segmentDataSelectors.getCustomerId(state.segmentData)

