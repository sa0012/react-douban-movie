import { createAction } from 'redux-actions';
import { ADDWISHMOVIE, LESSWISHMOVIE, ADDSEENMOVIE, LESSSEENMOVIE, ADDFILMMARKER, LESSFILMMARKER } from '../actionTypes';


export const addWishMovie = createAction(ADDWISHMOVIE, (movie) => {
  return { movie };
});

export const lessWishMovie = createAction(LESSWISHMOVIE, (id) => {
  return { id }
});

export const addSeenMovie = createAction(ADDSEENMOVIE, (movie = {}) => {
  return { movie }
});

export const lessSeenMovie = createAction(LESSSEENMOVIE, (id) => {
  return { id }
});

export const addFilmMarker = createAction(ADDFILMMARKER, (marker = {}) => {
  return { marker }
});

export const lessFilmMarker = createAction(LESSFILMMARKER, (id) => {
  return { id }
});