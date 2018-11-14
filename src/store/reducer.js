import * as actionType from './actionType'

export default (state = 0, action) => {
  switch (action.type) {
    case actionType.INCREMENT:
      return state + action.count;
    case actionType.DECREMENT:
      return state - action.count;
    default:
      return state;
  }
}