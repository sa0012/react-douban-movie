import React, { Component } from 'react';
import MovieCard from '../../components/movieCard';
import {
  weeklyRank
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
    weeklyRank: bindActionCreators(weeklyRank, dispatch)
  }
}

@connect(state => ({

}), mapDispatchToProps)
class Weekly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: []
    }
  }

  componentDidMount() {
    this.weeklyRender();
  }

  weeklyRender = (callback) => {
    return new Promise((resolve, reject) => {
      this.props.weeklyRank(data => {
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
    this.weeklyRender(callback);
  }

  render() {
    return (
      <div className="weekly">
        <Header
          titleText={ '本周口碑榜' }
          { ...this.props } />
        <MovieCard 
          cardList={ this.state.cardList }
          loadMoreMovie={ this.loadMoreMovie }
          isRefresh={ false }
          { ...this.props } />
      </div>
    )
  }
}

export default Weekly;