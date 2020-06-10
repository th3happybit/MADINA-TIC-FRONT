import { combineReducers } from "redux";
import regroupReducer from "./regroupReducer";
import darkReducer from "./darkReducer";

export default combineReducers({
  regroup: regroupReducer,
  mode: darkReducer,
});
