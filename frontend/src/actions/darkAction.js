import { DARK } from "./types";

export const change_mode = () => (dispatch) => {
  dispatch({
    type: DARK,
  });
};
