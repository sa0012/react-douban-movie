import {
  take,
  call,
  put,
  select,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import {
  GETMOVIE,
  GETCOMINGMOVIE
} from '../../actionTypes';
import axios from 'axios';
import {
  commonParams
} from '../../api/config';
import {
  Toast
} from 'antd-mobile';

function* getMovieAsync(action) {
  const url = '/in_theaters';
  const data = Object.assign({}, commonParams, {
    start: action.payload.start,
    count: action.payload.count
  });

  Toast.loading('正在请求中...', 0, false);
  yield new Promise((resolve, reject) => {
    axios.get(url, {
      params: data
    }).then(res => {
      Toast.hide();
      action.payload.callback && action.payload.callback(res.data);
      return resolve(res.data);
    }).catch(err => {
      return reject(err);
    })
  })
}

function* getComingMovieAsync(action) {
  const url = '/coming_soon';
  const data = Object.assign({}, commonParams, {
    start: action.payload.start,
    count: action.payload.count
  });

  Toast.loading('正在请求中...', 0, false);
  yield axios.get(url, {
    params: data
  }).then(res => {
    Toast.hide();
    action.payload.callback && action.payload.callback(res.data);
    return Promise.resolve(res.data);
  }).catch(err => {
    return Promise.reject(err);
  })
}


export function* getMovieWatch() {
  yield takeEvery(GETMOVIE, getMovieAsync);
}

export function* getComingMovieWatch() {
  yield takeEvery(GETCOMINGMOVIE, getComingMovieAsync);
}