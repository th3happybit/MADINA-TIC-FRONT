import { combineReducers } from "redux";
import regroupReducer from "./regroupReducer";

export default combineReducers({
  regroup: regroupReducer,
});
