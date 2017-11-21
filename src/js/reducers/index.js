import { combineReducers } from "redux";
import messages from "./AppReducer";
import subjects from "./MessageSubjectReducer";
import accounts from "./AccountsReducer";


export default combineReducers({
  messages,subjects,accounts
})
