import { fork } from 'redux-saga/effects';
import { getMovieWatch, getComingMovieWatch } from './movieShow/';
import { movieSearchWatch, tagSearchWatch } from './movieSearch/';
import { top250RankWatch, usBoxRankWatch, weeklyRankkWatch, newMoviesRankWatch } from './movieRank/';
import { getMovieDetailWatch, getMovieReviewWatch, getAllReviewsWatch, getAllCommentsWatch } from './movieDetail/';
import { getCelebrityWatch, getCelebrityWorksWatch } from './movieCelebrity/';

export default function* rootSaga() {
  
  // 首页tab展示接口
  yield fork(getMovieWatch);
  yield fork(getComingMovieWatch);

  // // 搜索页接口
  yield fork(movieSearchWatch);
  yield fork(tagSearchWatch);

  // // 排行榜卡片
  yield fork(top250RankWatch);
  yield fork(usBoxRankWatch);
  yield fork(weeklyRankkWatch);
  yield fork(newMoviesRankWatch);

  // // 详情
  yield fork(getMovieDetailWatch);
  yield fork(getMovieReviewWatch);
  yield fork(getAllReviewsWatch);
  yield fork(getAllCommentsWatch);

  // // 名人查询
  yield fork(getCelebrityWatch);
  yield fork(getCelebrityWorksWatch);
}