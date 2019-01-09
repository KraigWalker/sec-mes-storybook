import { combineReducers } from "redux";
import messages from "./SecureMessageLandingReducer";
import subjects from "./MessageSubjectReducer";
import accounts from "./AccountsReducer";
import viewMessage from "./ViewMessageReducer";
import accessibilityReducer from "./AccessibilityReducer";
import segmentData from "./SegmentsReducer";
import customerDetails from "./CustomerReducer";
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
