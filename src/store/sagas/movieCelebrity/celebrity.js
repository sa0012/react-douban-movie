import {
  take,
  call,
  put,
  select,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import axios from 'axios';
import {
  commonParams
} from '../../api/config';
import {
  GETCELEBRITY,
  GETCELEBRITYWORKS
} from '../../actionTypes';
import {
  Toast
} from 'antd-mobile';

function* getCelebrityAsync(action) {
  const url = `/v2/movie/celebrity/${ action.payload.id }`;
  const data = Object.assign({}, commonParams);

  Toast.loading('正在请求中...', 0, false);
  yield axios.get(url, {
    params: data
  }).then(res => {
    Toast.hide();
    action.payload.callback && action.payload.callback(res.data);
  }).catch(error => {
    return Promise.reject(error);
  })
}

function* getCelebrityWorksAsync(action) {
  const url = `/v2/movie/celebrity/${ action.payload.id }`;
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
  }).catch(error => {
    return Promise.reject(error);
  })
}

export function* getCelebrityWatch() {
  yield takeEvery(GETCELEBRITY, getCelebrityAsync);
}

export function* getCelebrityWorksWatch() {
  yield takeEvery(GETCELEBRITYWORKS, getCelebrityWorksAsync);
}