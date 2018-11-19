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

let wishMovieState = [];
let seenMovieState = [];
let filmMarkereState = [];
const wishMovieList = handleActions({
  [ADDWISHMOVIE]: (state = wishMovieState, action) => {
    state.push(action.payload.movie);
    return JSON.parse(JSON.stringify(state));
  },
  [LESSWISHMOVIE]: (state = wishMovieState, action) => {
    const itemIndex = state.findIndex(i => i.id === action.payload.id);
    return state.filter((item, index) => index !== itemIndex);
  }
}, wishMovieState);


const seenMovieList = handleActions({
  [ADDSEENMOVIE]: (state = seenMovieState, action) => {
    state.push(action.payload.movie);
    return JSON.parse(JSON.stringify(state));
  },
  [LESSSEENMOVIE]: (state = seenMovieState, action) => {
    const itemIndex = state.findIndex(i => i.id === action.payload.id);
    return state.filter((item, index) => index !== itemIndex);
  }
}, seenMovieState);


const filmMarkerList = handleActions({
  [ADDFILMMARKER]: (state = filmMarkereState, action) => {
    state.push(action.payload.movie);
    return JSON.parse(JSON.stringify(state));
  },
  [LESSFILMMARKER]: (state = filmMarkereState, action) => {
    const itemIndex = state.findIndex(i => i.id === action.payload.id);
    return state.filter((item, index) => index !== itemIndex);
  }
}, filmMarkereState);



module.exports = {
  wishMovieList,
  seenMovieList,
  filmMarkerList
}