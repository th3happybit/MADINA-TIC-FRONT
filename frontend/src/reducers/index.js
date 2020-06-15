import { combineReducers } from "redux";
import regroupReducer from "./regroupReducer";
import darkReducer from "./darkReducer";
import languageReducer from "./languageReducer";

export default combineReducers({
  regroup: regroupReducer,
  mode: darkReducer,
  language: languageReducer,
});
