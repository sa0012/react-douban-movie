import { take, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { commonParams } from '../../api/config';
import { GETMOVIEDETAIL, GETMOVIEREVIEW, GETALLREVIEWS, GETALLCOMMENTS } from '../../actionTypes';
import {
  Toast
} from 'antd-mobile';

function* getMovieDetailAsync(action) {
  const url = `/subject/${ action.payload.id }`;
  const data = Object.assign({}, commonParams);
  Toast.loading('正在请求中...', 0, false);
  yield axios.get(url, {
    params: data
  }).then(res => {
    Toast.hide();
    action.payload.callback && action.payload.callback(res.data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

function* getMovieReviewAsync(action) {
  const url = `/review/${ action.payload.id }`;
  const data = Object.assign({}, commonParams);
  Toast.loading('正在请求中...', 0, false);
  yield axios.get(url, {
    params: data
  }).then(res => {
    Toast.hide();
    action.payload.callback && action.payload.callback(res.data);
  }).catch(error => {
    return Promise.reject(error);
  });
}

function* getAllReviewsAsync(action) {
  const url = `/subject/${ action.payload.id }/reviews`;
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
  });
}

function* getAllCommentsAsync(action) {
  const url = `/subject/${ action.payload.id }/comments`;
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
  });
}

export function* getMovieDetailWatch() {
  yield takeLatest(GETMOVIEDETAIL, getMovieDetailAsync);
}

export function* getMovieReviewWatch() {
  yield takeEvery(GETMOVIEREVIEW, getMovieReviewAsync);
}

export function* getAllReviewsWatch() {
  yield takeEvery(GETALLREVIEWS, getAllReviewsAsync);
}

export function* getAllCommentsWatch() {
  yield takeEvery(GETALLCOMMENTS, getAllCommentsAsync);
}