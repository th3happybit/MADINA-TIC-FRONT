import { ADD_PARENT, ADD_CHILDS } from "./types";

export const add_parent = (data) => (dispatch) => {
  dispatch({
    type: ADD_PARENT,
    payload: data,
  });
};

export const add_childs = (data) => (dispatch) => {
  dispatch({
    type: ADD_CHILDS,
    payload: data,
  });
};
