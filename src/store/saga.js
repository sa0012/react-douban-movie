import { take, call, put, select } from 'redux-saga/effects';
import * as actions from './action';
import * as actionType from './actionType';
import fetchSmart from './fetch'

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* incrementAsync(values) {
  try {
    return yield call(delay, 500)
  } catch(error) {

  }
}

export function* incrementAsyncWatch() {
  while (true) {
    let request = yield take(actionType.INCREMENT_ASYNC);
    let response = yield call(incrementAsync, request.count)
    let state = yield select(state => state)
    console.log(response)

    yield put({
      type: actionType.INCREMENT,
      count: request.count,
      text: 'async'
    })
  }
}

function* receiveMovie() {
  try {
    return yield call(fetchSmart, '/in_theaters')
  } catch (error) {

  }
}

export function* receiveMovieWatch() {
  while (true) {
    let request = yield take(actionType.RECEIVE_MOVIE)
    let response = yield call(receiveMovie)
    let state = yield select(state => state.movies)

    let movies = Object.assign({}, state, response)
    yield put({
      type: actionType.GET_MOVIE,
      movies: movies
    })
    console.log(request, response, state)
  }
}