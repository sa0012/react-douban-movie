import React, { Component } from 'react';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { getCelebrityWorks } from '../../store/actions/celebrity';
import { bindActionCreators } from 'redux';
import MovieList from '../../components/movieList';

function mapDispatchToProps(dispatch) {
  return {
    getCelebrityWorks: bindActionCreators(getCelebrityWorks, dispatch),
  }
}



@connect(state => ({
  movieList: state.movieList
}), mapDispatchToProps)
class AllCelebritys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mastList: [],
      reduceHeight: 0,
      mastIndex: 0,
      count: 20,
      mastMore: true,
      detailId: ''
    }
  }

  componentDidMount() {
    const { pathname } = this.props.history.location;
    let detailId = pathname.split('/')[2];
    this.setState({
      detailId: detailId
    });
    this.requestMethod('getCelebrityWorks', detailId, this.state.mastIndex, this.state.count, 'mastIndex', 'mastList');

  }

  checkMore = (indexType, data, callback) => {
    const movies = data.works;
    if (!movies.length || this.state[indexType] + data.count > data.total) {
      callback && callback('isBottom')
      this.setState({
        mastMore: false
      });
    }
  }

  requestMethod = (postMethod, id, start = 0, count = 20, indexType, arrType, callback) => {
    this.props[postMethod](id, start, count, async (data) => {
      let movies = data.works || [];
      this.checkMore(indexType, data, callback)
      try {
        if (Object.prototype.toString.call(movies) === '[object Array]') {
          movies.length > 0 && movies.forEach((movie, index) => {
            this.state[arrType].push(movie.subject);
          })
          await new Promise((resolve, reject) => {
            resolve();
            this.setState({
              [arrType]: this.state[arrType],
              [indexType]: this.state[indexType] + 20
            });
          });

        }
      } catch (e) { }
    });
  }

  loadMoreMovie = (callback) => {
    this.state.mastMore ? this.requestMethod('getCelebrityWorks', this.state.detailId, this.state.mastIndex, this.state.count, 'mastIndex', 'mastList', callback) : callback('isBottom');
  }

  movieListRender = () => {
    console.log(this.state.moviesList)
    return (
      <MovieList
        reduceHeight={51}
        loadMoreMovie={this.loadMoreMovie}
        movieLists={this.state.mastList}
        {...this.props} />
    );
  }

  render() {
    console.log(this.state.moviesList)
    return (
      <div className="all-celebrity" style={{ paddingTop: '55px' }}>
        <Header
          titleText="全部作品"
          {...this.props} />
        { this.movieListRender() }
      </div>
    );
  }
}

export default AllCelebritys;