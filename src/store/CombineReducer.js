import { combineReducers } from 'redux';
import count from './reducer';
import hello from './reducer1';
import char from './reducer2';
import movies from './reducerObj'

const rootReducer = combineReducers({
  count,
  hello,
  char,
  movies
});

export default rootReducer;