import { createAction } from 'redux-actions';
import { GETCELEBRITY, GETCELEBRITYWORKS } from '../actionTypes';

export const getCelebrity = createAction(GETCELEBRITY, (id, callback = Function) => {
  return { id, callback };
});

export const getCelebrityWorks = createAction(GETCELEBRITYWORKS, (id, start = 0, count = 10, callback = Function) => {
  return { id, start, count, callback };
});