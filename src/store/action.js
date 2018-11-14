import * as actionType from './actionType'
import fetchSmart from './fetch'

export const increment = (count, text) => {
  return {
      type: actionType.INCREMENT,
      count,
      text
  };
};

export const decrement = (count, text) => {
  return {
      type: actionType.DECREMENT,
      count,
      text
  };
};

export const handleInput = (char = '') => {
  return {
    type: actionType.HANDLEINPUT,
    char
  }
}

export const incrementAsync = (count = 1) => {
  return {
    type: actionType.INCREMENT_ASYNC,
    count
  }
}

export const receiveMovie = () => {
  return {
    type: actionType.RECEIVE_MOVIE
  }
}

export const getMovie = (movies = {}) => {
  return {
    type: actionType.GET_MOVIE,
    movies: movies
  }
}