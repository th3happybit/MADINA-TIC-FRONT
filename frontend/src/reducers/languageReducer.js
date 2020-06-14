import { languages } from "../language";
import { LANGUAGE } from "../actions/types";

const INITIAL_STATE = languages.french;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LANGUAGE:
      console.log(action);
      return !state;
    default:
      return state;
  }
};
