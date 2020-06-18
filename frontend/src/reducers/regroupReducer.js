import { ADD_PARENT, ADD_CHILDS } from "../actions/types";

const INITIAL_STATE = {
  parent: null,
  childs: [],
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_PARENT:
      return {
        ...state,
        parent: action.payload,
        childs: [],
      };
    case ADD_CHILDS:
      let arrayTemp = [];
      let exist = false;
      let newArray = state.childs;
      if (action.payload) {
        state.childs.map((elm) => {
          if (elm === action.payload) {
            exist = true;
          }
        });
        if (!exist) {
          newArray.push(action.payload);
          return {
            ...state,
            childs: newArray,
          };
        } else {
          for (let i = 0; i < state.childs.length; i++) {
            const did = state.childs[i];
            if (did !== action.payload) {
              arrayTemp.push(did);
            }
          }
          return {
            ...state,
            childs: arrayTemp,
          };
        }
      } else {
        return {
          ...state,
          childs: [],
        };
      }
    default:
      return state;
  }
}
