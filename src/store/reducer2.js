import * as actionTypes from './actionType';

export default (state = '', action) => {
  switch (action.type) {
    case actionTypes.HANDLEINPUT:
      return action.char;
    default:
      return state;
  }
}