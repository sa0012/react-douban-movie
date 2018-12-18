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
import { setStore, getStore } from '../../util/mUtils';

let wishMovieState = [];
let seenMovieState = [];
let filmMarkereState = [];
try {
  wishMovieState = JSON.parse(getStore('wishMovieList')) || [];
  seenMovieState = JSON.parse(getStore('seenMovieList')) || [];
  filmMarkereState = JSON.parse(getStore('filmMarkerList')) || [];
} catch(e) {}

const wishMovieList = handleActions({
  [ADDWISHMOVIE]: (state = wishMovieState, action) => {
    state.push(action.payload.movie);
    setStore('wishMovieList', state);
    return JSON.parse(JSON.stringify(state));
  },
  [LESSWISHMOVIE]: (state = wishMovieState, action) => {
    const itemIndex = state.findIndex(i => i.id === action.payload.id);
    // state.filter((item, index) => index !== itemIndex);
    state.splice(itemIndex, 1);
    setStore('wishMovieList', state);
    return state;
  }
}, wishMovieState);


const seenMovieList = handleActions({
  [ADDSEENMOVIE]: (state = seenMovieState, action) => {
    state.push(action.payload.movie);
    setStore('seenMovieList', state);
    return JSON.parse(JSON.stringify(state));
  },
  [LESSSEENMOVIE]: (state = seenMovieState, action) => {
    const itemIndex = state.findIndex(i => i.id === action.payload.id);
    // state.filter((item, index) => index !== itemIndex);
    state.splice(itemIndex, 1);
    setStore('seenMovieList', state);
    return state;
  }
}, seenMovieState);


const filmMarkerList = handleActions({
  [ADDFILMMARKER]: (state = filmMarkereState, action) => {
    state.push(action.payload.marker);
    setStore('filmMarkerList', state);
    return JSON.parse(JSON.stringify(state));
  },
  [LESSFILMMARKER]: (state = filmMarkereState, action) => {
    const itemIndex = state.findIndex(i => i.id === action.payload.id);
    // state.filter((item, index) => index !== itemIndex);
    state.splice(itemIndex, 1);
    setStore('filmMarkerList', state);
    return state;
  }
}, filmMarkereState);



module.exports = {
  wishMovieList,
  seenMovieList,
  filmMarkerList
}