import React, { Component } from 'react';
import {
  tagSearch
} from '../../store/actions/search';
import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';
import $ from '../../util';
import MovieList from '../../components/movieList';
import Header from '../../components/Header';

function mapDispatchToProps(dispatch) {
  return {
    tagSearch: bindActionCreators(tagSearch, dispatch)
  }
}

@connect(state => ({

}), mapDispatchToProps)
class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMoviesList: [],
      tagIndex: 0,
      tagArr: [],
      tagMore: true,
      count: 10,
      reduceHeight: 50,
      tag: ''
    }
  }

  componentDidMount() {
    const { pathname } = this.props.history.location;
    let tagQuery = pathname.split('/')[2];
    this.setState({
      tag: tagQuery
    });
    this.requestMethod('tagSearch', tagQuery, this.state.tagIndex, this.state.count, 'tagIndex', 'tagArr');
    console.log(tagQuery)
  }

  checkMore = (indexType, data, callback) => {
    const movies = data.subjects;
    if (!movies.length || this.state[indexType] + data.count > data.total) {
      callback && callback('isBottom')
      this.setState({
        tagMore: false
      });
    }
  }

  requestMethod = (postMethod, query = '', start = 0, count = 10, indexType, arrType, callback) => {
    this.props[postMethod](query, start, count, async (data) => {
      let movies = data.subjects || [];

      this.checkMore(indexType, data, callback)
      try {
        if (Object.prototype.toString.call(movies) === '[object Array]') {
          let moviesList = this.state[arrType].concat(movies);
          await new Promise((resolve, reject) => {
            resolve();
            this.setState({
              [arrType]: moviesList,
              [indexType]: this.state[indexType] + 10
            });
          });

          await new Promise((resolve, reject) => {
            resolve();
            callback && callback();
            let allMoviesList = JSON.parse(JSON.stringify(this.state[arrType]));
            this.setState({
              allMoviesList: allMoviesList,
            });
          })

        }
      } catch (e) { }
    });
  }

  loadMoreMovie = (callback) => {
    this.state.tagMore ? this.requestMethod('tagSearch', this.state.tag, this.state.tagIndex, this.state.count, 'tagIndex', 'tagArr', callback) : callback('isBottom');
  }

  render() {
    return (
      <div className="tag-list">
        <Header 
          titleText={ this.state.tag }
          { ...this.props } />
        <div style={{ paddingTop: '50px' }}>
          <MovieList
            reduceHeight={this.state.reduceHeight}
            loadMoreMovie={this.loadMoreMovie}
            movieLists={this.state.allMoviesList}
            {...this.props} />
        </div>
      </div>
    );
  }
}

export default TagList;