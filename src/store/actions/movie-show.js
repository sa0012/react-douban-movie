import { createAction } from 'redux-actions';
import { MOVIE_SHOW, GETMOVIE, GETCOMINGMOVIE, ALLMOVIELIST } from '../actionTypes';

export const movie_show = createAction(MOVIE_SHOW, (movieList = {}) => {
  console.log(movieList, 'movie_show')
  return { movieList }
});

export const getMovie = createAction(GETMOVIE, (start = 0, count = 10, callback = Function) => {
  return { start, count, callback }
});

export const getComingMovie = createAction(GETCOMINGMOVIE, (start = 0, count = 10, callback = Function) => {
  return { start, count, callback };
});

export const allMovieList = createAction(ALLMOVIELIST, (movies = {}) => {
  return movies;
});