import {
  take,
  call,
  put,
  takeEvery
} from 'redux-saga/effects';
import {
  TOP250RANK,
  USBOXRANK,
  WEEKLYRANK,
  NEWMOVIESRANK
} from '../../actionTypes';
import axios from 'axios';
import {
  commonParams
} from '../../api/config';
import {
  Toast
} from 'antd-mobile';

function* top250RankAsync(action) {
  const url = '/top250';
  const data = Object.assign({}, commonParams, {
    start: action.payload.start,
    count: action.payload.count
  });

  // yield Toast.loading('正在请求中1...', 0, false);
  yield axios.get(url, {
    params: data
  }).then(res => {
    // Toast.hide();
    action.payload.callback && action.payload.callback(res.data);
  }).catch(error => {
    return Promise.reject(error);
  })
}

function* usBoxRankAsync(action) {
  const url = '/us_box';
  const data = Object.assign({}, commonParams);

  // yield Toast.loading('正在请求中2...', 0, false);
  yield axios.get(url, {
    params: data
  }).then(res => {
    // Toast.hide();
    action.payload.callback && action.payload.callback(res.data);
  }).catch(error => {
    return Promise.reject(error);
  })
}

function* weeklyRankAsync(action) {
  const url = '/weekly';
  const data = Object.assign({}, commonParams);

  // yield Toast.loading('正在请求中3...', 0, false);
  yield axios.get(url, {
    params: data
  }).then(res => {
    // Toast.hide();
    action.payload.callback && action.payload.callback(res.data);
  }).catch(error => {
    return Promise.reject(error);
  })
}

function* newMoviesRankAsync(action) {
  const url = '/new_movies';
  const data = Object.assign({}, commonParams);

  // yield Toast.loading('正在请求中4...', 0, false);
  yield axios.get(url, {
    params: data
  }).then(res => {
    // Toast.hide();
    action.payload.callback && action.payload.callback(res.data);
  }).catch(error => {
    return Promise.reject(error);
  })
}

export function* top250RankWatch() {
  yield takeEvery(TOP250RANK, top250RankAsync);
}

export function* usBoxRankWatch() {
  yield takeEvery(USBOXRANK, usBoxRankAsync);
}

export function* weeklyRankkWatch() {
  yield takeEvery(WEEKLYRANK, weeklyRankAsync);
}

export function* newMoviesRankWatch() {
  yield takeEvery(NEWMOVIESRANK, newMoviesRankAsync);
}