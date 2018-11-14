import { take, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { commonParams } from '../../api/config';
import { MOVIESEARCH, TAGSEARCH } from '../../actionTypes';
import {
  Toast
} from 'antd-mobile';

function* movieSearchAsync(action) {
  const url = '/v2/movie/search';
  console.log(action, 'action')
  const data = Object.assign({}, commonParams, {
    q: action.payload.query,
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

function* tagSearchAsync(action) {
  const url = '/v2/movie/search';
  const data = Object.assign({}, commonParams, {
    tag: action.payload.tag,
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

export function* movieSearchWatch() {
  yield takeEvery(MOVIESEARCH ,movieSearchAsync);
}

export function* tagSearchWatch() {
  yield takeEvery(TAGSEARCH ,tagSearchAsync);
}