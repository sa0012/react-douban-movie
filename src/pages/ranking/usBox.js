import React, { Component } from 'react';
import MovieCard from '../../components/movieCard';
import {
  usBoxRank
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
    usBoxRank: bindActionCreators(usBoxRank, dispatch)
  }
}

@connect(state => ({

}), mapDispatchToProps)
class UsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: []
    }
  }

  componentDidMount() {
    this.usBoxRender();
  }

  usBoxRender = (callback) => {
    return new Promise((resolve, reject) => {
      this.props.usBoxRank(data => {
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
    this.usBoxRender(callback);
  }

  render() {
    return (
      <div className="us-box">
        <Header
          titleText={ '北美票房榜' }
          { ...this.props } />
        <MovieCard 
          cardList={ this.state.cardList }
          loadMoreMovie={ this.loadMoreMovie }
          { ...this.props } />
      </div>
    )
  }
}

export default UsBox;