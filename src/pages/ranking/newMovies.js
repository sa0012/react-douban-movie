import React, { Component } from 'react';
import MovieCard from '../../components/movieCard';
import {
  newMoviesRank
} from '../../store/actions/movie-rank';
import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';

import $ from '../../util';
import Header from '../../components/Header';

function mapDispatchToProps(dispatch) {
  return {
    newMoviesRank: bindActionCreators(newMoviesRank, dispatch)
  }
}

@connect(state => ({

}), mapDispatchToProps)
class NewMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: []
    }
  }

  componentDidMount() {
    this.newMoviesRender();
  }

  newMoviesRender = (callback) => {
    return new Promise((resolve, reject) => {
      this.props.newMoviesRank(data => {
        resolve();
        callback && callback();
        let movies = data.subjects || [];
        this.setState({
          cardList: movies
        })
      })
    })
  }

  loadMoreMovie = (callback) => {
    this.newMoviesRender(callback);
  }

  render() {
    return (
      <div className="new-movies">
        <Header
          titleText={ '新片榜' }
          { ...this.props } />
        <MovieCard 
          cardList={ this.state.cardList }
          loadMoreMovie={ this.loadMoreMovie }
          { ...this.props } />
      </div>
    )
  }
}

export default NewMovies;