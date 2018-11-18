import { MOVIE_SHOW } from '../actionTypes';
import { handleActions } from 'redux-actions';

const defalutState = {};

const movieList = handleActions({
  [MOVIE_SHOW]: (state = defalutState, action) => {
    console.log(action, 'movie_showdddd')
    return Object.assign({}, state, action.movieList);
  },
}, defalutState);

module.exports = {
  movieList,
}