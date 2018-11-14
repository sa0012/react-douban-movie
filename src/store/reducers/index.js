import { combineReducers } from 'redux';
import { movieList } from './movie-show';
import count from '../reducer';

const rootReducers = combineReducers({
  movieList,
  count
});

export default rootReducers;