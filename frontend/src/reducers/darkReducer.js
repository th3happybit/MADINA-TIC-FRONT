import { DARK } from "../actions/types";

const INITIAL_STATE = {
  isDark: false,
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case DARK:
      return {
        isDark: !state.isDark,
      };
    default:
      return state;
  }
}
