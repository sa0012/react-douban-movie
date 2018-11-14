import * as actionType from './actionType'

export default (state = 'hello', action) => {
  switch (action.type) {
    case actionType.INCREMENT:
      return 'increment' + action.text;
    case actionType.DECREMENT:
      return 'decrement' + action.text;
    default:
      return state;
  }
}