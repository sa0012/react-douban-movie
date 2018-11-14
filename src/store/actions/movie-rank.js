import { createAction } from 'redux-actions';
import { TOP250RANK, USBOXRANK, WEEKLYRANK, NEWMOVIESRANK } from '../actionTypes';

export const top250Rank = createAction(TOP250RANK, (start = 0, count = 10, callback = Function) => {
  return { start, count, callback };
});

export const usBoxRank = createAction(USBOXRANK, (callback = Function) => {
  return { callback };
});

export const weeklyRank = createAction(WEEKLYRANK, (callback = Function) => {
  return { callback };
});

export const newMoviesRank = createAction(NEWMOVIESRANK, (callback = Function) => {
  return { callback };
});