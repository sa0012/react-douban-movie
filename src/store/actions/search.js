import { createAction } from 'redux-actions';
import { MOVIESEARCH, TAGSEARCH } from '../actionTypes';

export const movieSearch = createAction(MOVIESEARCH, (query = '', start = 0, count = 10, callback = Function) => {
  return { query, start, count, callback };
});

export const tagSearch = createAction(TAGSEARCH, (tag = '', start = 0, count = 10, callback = Function) => {
  return { tag, start, count, callback };
});
