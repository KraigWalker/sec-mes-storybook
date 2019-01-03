import { combineReducers } from "redux";
import messages from "./SecureMessageLandingReducer";
import subjects from "./MessageSubjectReducer";
import accounts from "./AccountsReducer";
import viewMessage from "./ViewMessageReducer";
import accessibilityReducer from "./AccessibilityReducer";
import segmentData from "./SegmentsReducer";
import customerDetails from "./CustomerReducer";

export default combineReducers({
  messages,subjects,accounts,viewMessage,accessibilityReducer,segmentData,customerDetails
})
