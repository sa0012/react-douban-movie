import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../../components/search';
import PropTypes from 'prop-types';
import { getMovie, getComingMovie } from '../../store/actions/movie-show';
import { bindActionCreators } from 'redux';
import { Tabs } from 'antd-mobile';
import MovieList from '../../components/movieList';

function mapDispatchToProps(dispatch) {
  return {
    getMovie: bindActionCreators(getMovie, dispatch),
    getComingMovie: bindActionCreators(getComingMovie, dispatch),
  }
}

@connect(state => ({
  movieList: state.movieList
}), mapDispatchToProps)
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reduceHeight: 0,
      initPage: 0,
      isSecondTabs: false,
      hotIndex: 0,
      commingIndex: 0,
      allMoviesList: [],
      hotMovieList: [],
      comingMovieList: [],
      hotMore: true,
      commingMore: true
    }
  }

  static defaultProps = {
    movieList: {}
  }

  static propTypes = {
    movieList: PropTypes.object
  }

  componentDidMount() {
    let tabHeight = document.querySelector('.am-tabs-tab-bar-wrap').clientHeight + 50 + 60 - 0;
    setTimeout(() => {
      this.setState({
        reduceHeight: tabHeight
      });
    }, 0);
    this.requestMethod('getMovie', 0, 10, 'hotIndex', 'hotMovieList');
  }

  checkMore = (indexType, data, callback) => {
    const movies = data.subjects;
    if (!movies.length || this.state[indexType] + data.count > data.total) {
      callback && callback('isBottom')
      if (this.state.initPage === 0) {
        this.setState({
          hotMore: false
        });
      } else if (this.state.initPage === 1) {
        this.setState({
          commingMore: false
        });
      }
    }
  }

  requestMethod = (postMethod, start = 0, count = 10, indexType, arrType, callback) => {
    this.props[postMethod](start, count, async (data) => {
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
            if (postMethod === 'getComingMovie') {
              let filterMoviesDay = [allMoviesList[0]];
              for (let i = 0; i < allMoviesList.length; i++) {
                let repeat = false;
                for (let j = 0; j < filterMoviesDay.length; j++) {
                  if (allMoviesList[i].mainland_pubdate === filterMoviesDay[j].mainland_pubdate) {
                    repeat = true;
                    break;
                  }
                }

                if (!repeat) {
                  filterMoviesDay.push(allMoviesList[i]);
                }
              }

              let filterAllMovies = JSON.parse(JSON.stringify(allMoviesList));
              let dayIndexArr = [];
              for (let s = 0; s < filterMoviesDay.length; s++) {
                for (let k = 0; k < filterAllMovies.length; k++) {
                  delete filterAllMovies[k].mainland_pubdate;
                  if (filterMoviesDay[s].id === filterAllMovies[k].id) {
                    dayIndexArr.push(k)
                  }
                 }
              }
              
              dayIndexArr.forEach((item, index) => {
                filterAllMovies[item].mainland_pubdate = filterMoviesDay[index].mainland_pubdate;
              })

              allMoviesList = JSON.parse(JSON.stringify(filterAllMovies));
            }
            this.setState({
              allMoviesList: allMoviesList,
            });
          })

        }
      } catch (e) { }
    });
  }


  TabExample = () => {
    const tabs = [
      { title: '正在热映' },
      { title: '即将上映' },
    ];
    return (
      <div>
        <Tabs
          tabs={tabs}
          initialPage={0}
          tabBarUnderlineStyle={{ borderColor: '#42bd56' }}
          tabBarActiveTextColor="#42bd56"
          tabBarInactiveTextColor="#666"
          swipeable={false}
          onChange={(tab, index) => this.handleChangeTabs(tab, index)}
        >
          {
            (tabs || []).map((item, index) => {
              return (
                <MovieList
                  reduceHeight={this.state.reduceHeight}
                  loadMoreMovie={this.loadMoreMovie}
                  movieLists={this.state.allMoviesList}
                  needDay={index === 1 ? true : false}
                  key={index}
                  { ...this.props } />
              );
            })
          }
        </Tabs>
      </div>
    );
  }

  handleChangeTabs = (tab, index) => {
    this.setState({
      initPage: index
    });
    if (index === 0) {
      this.setState({
        allMoviesList: JSON.parse(JSON.stringify(this.state.hotMovieList))
      })
    } else if (index === 1) {
      if (!this.state.isSecondTabs) {
        this.setState({
          isSecondTabs: true,
          allMoviesList: []
        });
        this.requestMethod('getComingMovie', 0, 10, 'commingIndex', 'comingMovieList');
      } else {
        this.setState({
          allMoviesList: JSON.parse(JSON.stringify(this.state.comingMovieList))
        })
      }
    }
  }

  loadMoreMovie = (callback) => {
    if (this.state.initPage === 0) {
      this.state.hotMore ? this.requestMethod('getMovie', this.state.hotIndex, 10, 'hotIndex', 'hotMovieList', callback) : callback('isBottom');
    } else if (this.state.initPage === 1) {
      this.state.commingMore ? this.requestMethod('getComingMovie', this.state.commingIndex, 10, 'commingIndex', 'comingMovieList', callback) : callback('isBottom');
    }
  }


  render() {
    return (
      <div className="home">
        <Search { ...this.props } />
        {this.TabExample()}
      </div>
    )
  }
}

export default Home;