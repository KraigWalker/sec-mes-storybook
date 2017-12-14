import { combineReducers } from "redux";
import messages from "./SecureMessageLandingReducer";
import subjects from "./MessageSubjectReducer";
import accounts from "./AccountsReducer";
import viewMessage from "./ViewMessageReducer";
import accessibilityReducer from "./AccessibilityReducer";

export default combineReducers({
  messages,subjects,accounts,viewMessage,accessibilityReducer
})
