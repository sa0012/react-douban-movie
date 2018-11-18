import { createAction } from 'redux-actions';
import { GETMOVIEDETAIL, GETMOVIEREVIEW, GETALLREVIEWS, GETALLCOMMENTS } from '../actionTypes';

export const getMovieDetail = createAction(GETMOVIEDETAIL, (id, callback = Function) => {
  return { id, callback };
});

export const getMovieReview = createAction(GETMOVIEREVIEW, (id, callback = Function) => {
  return { id, callback };
});

export const getAllReviews = createAction(GETALLREVIEWS, (id = '', ratingType = '', start = 0, count = 10, callback = Function) => {
  return { id, ratingType, start, count, callback };
});

export const getAllComments = createAction(GETALLCOMMENTS, (id = '', ratingType = '', start = 0, count = 10, callback = Function) => {
  return { id, ratingType, start, count, callback };
});