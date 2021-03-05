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
import { getBrandReducer } from './BrandReducer';

//one for one mapping with methods in messageSelectors and functionality here
export const MessageSelectors = Object.entries(messageSelectors).reduce(
  (agg, current) => {
    const [key, method] = current;
    agg[key] = (state, status) => method(state.messages, status);
    return agg;
  },
  {}
);

export function getAccounts(state) {
  return accountSelectors.getAccounts(state.accounts);
}

export function getSubjects(state) {
  return subjectSelectors.getSubjects(state.subjects);
}

export function getSubjectErrors(state) {
  return subjectSelectors.getSubjectErrors(state.subjects);
}

export function getMessageDetail(state) {
  return viewMessageSelectors.getMessageDetail(state.viewMessage);
}

export function getCustomerError(state) {
  return customerSelectors.getCustomerError(state.customerDetails);
}

export default function getReducer(brandId) {
  return combineReducers({
    brand: getBrandReducer(brandId),
    messages,
    subjects,
    accounts,
    viewMessage,
    accessibility,
    segmentData,
    customerDetails,
    documentManagement,
  });
}
