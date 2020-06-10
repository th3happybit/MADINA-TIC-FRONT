import { LANGUAGE } from "./types";

export const change_language = (language) => (dispatch) => {
  dispatch({
    type: LANGUAGE,
    payload: language,
  });
};
