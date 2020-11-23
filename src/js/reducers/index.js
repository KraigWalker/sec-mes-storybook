import { combineReducers } from 'redux';
import { reducer as documentManagement } from 'document-management-lib';
import messages, {
  selectors as messageSelectors,
} from './SecureMessageLandingReducer';
import subjects, {
  selectors as subjectSelectors,
} from './MessageSubjectReducer';
import accounts, { selectors as accountSelectors } from './AccountsReducer';
import viewMessage, {
  selectors as viewMessageSelectors,
} from './ViewMessageReducer';
import { accessibilityReducer as accessibility } from './AccessibilityReducer';
import segmentData from './SegmentsReducer';
import customerDetails, {
  selectors as customerSelectors,
} from './CustomerReducer';

//one for one mapping with methods in messageSelectors and functionality here
export const MessageSelectors = Object.entries(messageSelectors).reduce(
  (agg, current) => {
    const [key, method] = current;
    agg[key] = (state, status) => method(state.messages, status);
    return agg;
  },
  {}
);

export const getAccounts = (state) =>
  accountSelectors.getAccounts(state.accounts);

export const getSubjects = (state) =>
  subjectSelectors.getSubjects(state.subjects);

export const getSubjectErrors = (state) =>
  subjectSelectors.getSubjectErrors(state.subjects);

export const getMessageDetail = (state) =>
  viewMessageSelectors.getMessageDetail(state.viewMessage);

export const getCustomerError = (state) =>
  customerSelectors.getCustomerError(state.customerDetails);

export default combineReducers({
  messages,
  subjects,
  accounts,
  viewMessage,
  accessibility,
  segmentData,
  customerDetails,
  documentManagement,
});
