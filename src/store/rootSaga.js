import { fork } from 'redux-saga/effects';
import { incrementAsyncWatch, receiveMovieWatch } from './saga';

export default function* rootSaga() {
  yield fork(incrementAsyncWatch);
  yield fork(receiveMovieWatch);
}