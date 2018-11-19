import { combineReducers } from 'redux';
import { movieList } from './movie-show';
import count from '../reducer';
import {
  wishMovieList,
  seenMovieList,
  filmMarkerList,
} from './collect';

const rootReducers = combineReducers({
  movieList,
  count,
  wishMovieList,
  seenMovieList,
  filmMarkerList,
});

export default rootReducers;