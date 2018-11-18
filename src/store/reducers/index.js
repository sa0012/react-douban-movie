import { combineReducers } from 'redux';
import { movieList } from './movie-show';
import count from '../reducer';
import {
  addWishMovieReducer,
  lessWishMovieReducer,
  addSeenMovieReducer,
  lessSeenMovieReducer,
  addFilmMarkerReducer,
  lessFilmMarkerReducer,
} from './collect';

const rootReducers = combineReducers({
  movieList,
  count,
  addWishMovieReducer,
  lessWishMovieReducer,
  addSeenMovieReducer,
  lessSeenMovieReducer,
  addFilmMarkerReducer,
  lessFilmMarkerReducer,
});

export default rootReducers;