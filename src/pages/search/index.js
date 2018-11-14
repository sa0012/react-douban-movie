import React, { Component } from 'react';
import {
  movieSearch,
  tagSearch
} from '../../store/actions/search';
import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';
import $ from '../../util';
import '../../assets/style/searchDetail/index.scss';
import img1 from '../../assets/images/img1.jpg';
import img2 from '../../assets/images/img2.jpg';
import img3 from '../../assets/images/img3.jpg';
import img4 from '../../assets/images/img4.jpg';
import img5 from '../../assets/images/img5.jpg';
import img6 from '../../assets/images/img6.jpg';
import img7 from '../../assets/images/img7.jpg';

import MovieList from '../../components/movieList';

function mapDispatchToProps(dispatch) {
  return {
    movieSearch: bindActionCreators(movieSearch, dispatch),
    tagSearch: bindActionCreators(tagSearch, dispatch)
  }
}

@connect(state => ({

}), mapDispatchToProps)
class SearchDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: ['豆瓣热门', '最新电影', '冷门佳片', '豆瓣高分', '经典电影'],
      typesOf: ['剧情', '爱情', '喜剧', '科幻', '动作', '犯罪', '动画', '悬疑', '治愈', '青春', '文艺', '同性'],
      countryTag: ['中国大陆', '美国', '香港', '台湾', '日本', '韩国', '英国', '法国', '德国'],
      features: ['青春', '治愈', '文艺', '女性', '小说改编', '超级英雄', '美食', '宗教', '励志'],
      bgImg: [img1, img2, img3, img4, img5, img6, img7],
      historyList: [],
      allMoviesList: [],
      searchValue: '',
      queryIndex: 0,
      tagIndex: 0,
      queryArr: [],
      tagArr: [],
      queryMore: true,
      tagMore: true,
      isQueryList: false,
      count: 10,
      reduceHeight: 50
    }
  }

  componentDidMount() {
  }

  checkMore = (indexType, data, callback) => {
    const movies = data.subjects;
    if (!movies.length || this.state[indexType] + data.count > data.total) {
      callback && callback('isBottom')
      if (this.state.isQueryList) {
        this.setState({
          queryMore: false
        });
      }
    }
  }

  requestMethod = (postMethod, query = '', start = 0, count = 10, indexType, arrType, callback) => {
    this.props[postMethod](query, start, count, async (data) => {
      let movies = data.subjects || [];

      if (indexType === 'queryIndex') {
        this.setState({
          isQueryList: true
        });
      }
      this.checkMore(indexType, data, callback)
      try {
        if (Object.prototype.toString.call(movies) === '[object Array]') {
          let moviesList = this.state[arrType].concat(movies);
          if (indexType === 'queryIndex') {
            let historyArr = [];
            historyArr.push(this.state.searchValue);
            this.setState({
              historyList: historyArr
            })
          }
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

  closeSearch = () => {
    this.props.history.push('/')
  }

  searchMovie = $.debounce(e => {
    let searchValue = e.target.value;
    this.setState({
      searchValue: searchValue
    });
    if (!searchValue) {
      this.setState({
        searchValue: searchValue,
        isQueryList: false
      });
      return;
    }
    this.requestMethod('movieSearch', searchValue, this.state.queryIndex, this.state.count, 'queryIndex', 'queryArr')
  })

  topSearchInput = () => {
    return (
      <div className='search-input'>
        <div className="search-wrap">
          <i className="iconfont icon-search search-icon"></i>
          <input
            type="text"
            placeholder="搜索电影/影人"
            className="input"
            onChange={this.searchMovie} />
        </div>
        <div className="close" onClick={() => this.closeSearch()}>取消</div>
      </div>
    );
  }

  loadMoreMovie = (callback) => {
    this.state.queryMore ? this.requestMethod('movieSearch', this.state.searchValue, this.state.queryIndex, this.state.count, 'queryIndex', 'queryArr', callback) : callback('isBottom');
  }

  searchTags = (tag) => {
    tag && this.props.history.push(`/tag/${tag}`);
  }

  tabsRender = () => {
    return (
      <div className="tag-wrap">
        <h3 className="title">主题</h3>
        <div className="douban-tag">
          {
            this.state.topic.map((db, index) => {
              return (
                <div className="douban-item" key={index} onClick={() => this.searchTags(db)}>
                  <div className="item-img" style={{ backgroundImage: `url( ${this.state.bgImg[$.getBgImg(index)]} )`, backgroundPosition: 'center center', backgroundSize: 'cover' }}>
                    <div className="item-model"></div>
                  </div>
                  <span className="item-text">{db}</span>
                </div>
              )
            })
          }
        </div>
        <div className="movie-tag">
          <h3 className="title">类型</h3>
          {
            this.state.typesOf.map((movie, index) => {
              return (
                <div className="douban-item" key={index} onClick={() => this.searchTags(movie)}>
                  <div className="item-img" style={{ backgroundImage: `url( ${this.state.bgImg[$.getBgImg(index)]} )`, backgroundPosition: 'center center', backgroundSize: 'cover' }}>
                    <div className="item-model"></div>
                  </div>
                  <span className="item-text">{movie}</span>
                </div>
              )
            })
          }</div>
        <div className="country-tag">
          <h3 className="title">地区</h3>
          {
            this.state.countryTag.map((country, index) => {
              return (
                <div className="douban-item" key={index} onClick={() => this.searchTags(country)}>
                  <div className="item-img" style={{ backgroundImage: `url( ${this.state.bgImg[$.getBgImg(index)]} )`, backgroundPosition: 'center center', backgroundSize: 'cover' }}>
                    <div className="item-model"></div>
                  </div>
                  <span className="item-text">{country}</span>
                </div>
              )
            })
          }
        </div>
        <div className="features-tag">
          <h3 className="title">特色</h3>
          {
            this.state.features.map((feature, index) => {
              return (
                <div className="douban-item" key={index} onClick={() => this.searchTags(feature)}>
                  <div className="item-img" style={{ backgroundImage: `url( ${this.state.bgImg[$.getBgImg(index)]} )`, backgroundPosition: 'center center', backgroundSize: 'cover' }}>
                    <div className="item-model"></div>
                  </div>
                  <span className="item-text">{feature}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }

  searchHistory = () => {
    return (
      <div className="search-history">
        <div className="history-top">
          <div className="history-text">搜索历史</div>
          <i className="iconfont icon-bin history-bin"></i>
        </div>
        {
          this.searchHistoryList()
        }
      </div>
    );
  }


  searchHistoryList = () => {
    const historyList = this.state.historyList || [];
    return (
      <ul className="his-list">
        {
          historyList && historyList.length > 0 ? historyList.map((item, index) => {
            return (
              <li className="his-item">{ item }</li>
            );
          }) : (
              <li className="his-default">还没有搜索历史，快去搜索吧 :)</li>
            )
        }
      </ul>
    );
  }

  render() {
    return (
      <div className="search-detail">
        {this.topSearchInput()}
        {
          !this.state.isQueryList ? (
            <div>
              {this.tabsRender()}
              {this.searchHistory()}
            </div>
          ) : (
              <div style={{ paddingTop: '50px' }}>
                <MovieList
                  reduceHeight={this.state.reduceHeight}
                  loadMoreMovie={this.loadMoreMovie}
                  movieLists={this.state.allMoviesList}
                  {...this.props} />
              </div>
            )
        }

      </div>
    )
  }
}

export default SearchDetail;