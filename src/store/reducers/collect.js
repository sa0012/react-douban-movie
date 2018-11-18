import {
  handleActions
} from 'redux-actions';
import {
  ADDWISHMOVIE,
  LESSWISHMOVIE,
  ADDSEENMOVIE,
  LESSSEENMOVIE,
  ADDFILMMARKER,
  LESSFILMMARKER
} from '../actionTypes';

let defalutState = [];
const addWishMovieReducer = handleActions({
  [ADDWISHMOVIE]: (state = defalutState, action) => {
    state.push(action.payload.movie);
    console.log(action.payload.movie, 'action')
    return JSON.parse(JSON.stringify(state));
  }
}, defalutState);

const lessWishMovieReducer = handleActions({
  [LESSWISHMOVIE]: (state = defalutState, action) => {
    console.log(state, 'state')
    const itemIndex = state.findIndex(i => i.id === action.payload.id);
    console.log(itemIndex, state, 'item')
    return state.filter((item, index) => index !== itemIndex);
  }
}, defalutState);

const addSeenMovieReducer = handleActions({
  [ADDSEENMOVIE]: (state = defalutState, action) => {
    state.push(action.movie);
    return JSON.parse(JSON.stringify(state));
  }
}, defalutState);

const lessSeenMovieReducer = handleActions({
  [LESSSEENMOVIE]: (state = defalutState, action) => {
    return Object.assign({}, state, action.movie);
  }
}, defalutState);

const addFilmMarkerReducer = handleActions({
  [ADDFILMMARKER]: (state = defalutState, action) => {
    state.push(action.movie);
    return JSON.parse(JSON.stringify(state));
  }
}, defalutState);

const lessFilmMarkerReducer = handleActions({
  [LESSFILMMARKER]: (state = defalutState, action) => {
    return Object.assign({}, state, action.movie);
  }
}, defalutState);


module.exports = {
  addWishMovieReducer,
  lessWishMovieReducer,
  addSeenMovieReducer,
  lessSeenMovieReducer,
  addFilmMarkerReducer,
  lessFilmMarkerReducer,
}