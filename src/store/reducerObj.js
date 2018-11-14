import { GET_MOVIE } from './actionType';

export default (state = {}, action) => {
  switch(action.type) {
    case GET_MOVIE:
      return Object.assign({}, state, action.movies);
    default:
      return state;
  }
}