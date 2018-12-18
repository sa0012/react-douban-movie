import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import Header from '../../components/Header';
import {
  top250Rank,
} from '../../store/actions/movie-rank';
import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';

import $ from '../../util';

import MovieCard from '../../components/movieCard';

function mapDispatchToProps(dispatch) {
  return {
    top250Rank: bindActionCreators(top250Rank, dispatch),
  }
}

@connect(state => ({

}), mapDispatchToProps)
class Top250 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reduceHeight: 0,
      initPage: 0,
      // 数据容器
      allMoviesList: [],
      // 每一个tabs容器
      hotTabs1: [],
      hotTabs2: [],
      hotTabs3: [],
      hotTabs4: [],
      hotTabs5: [],
      // 每一个tabs调用接口累计索引
      hotTabsIndex1: 0,
      hotTabsIndex2: 50,
      hotTabsIndex3: 100,
      hotTabsIndex4: 150,
      hotTabsIndex5: 200,
      // 每个tabs加载更多条件
      hotTabsMore1: true,
      hotTabsMore2: true,
      hotTabsMore3: true,
      hotTabsMore4: true,
      hotTabsMore5: true,
      // 是否第一次加载
      isHotTabsReq2: false,
      isHotTabsReq3: false,
      isHotTabsReq4: false,
      isHotTabsReq5: false,
    }
  }

  componentDidMount() {
    let tabHeight = document.querySelector('.am-tabs-tab-bar-wrap').clientHeight + 50 + 60 - 0;
    setTimeout(() => {
      this.setState({
        reduceHeight: tabHeight
      });
    }, 0);

    this.requestMethod('top250Rank', 0, 10, 'hotTabsIndex1', 'hotTabs1')
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
            if (indexType === 'hotTabsIndex1') {
              if (this.state.hotTabsIndex1 < 50) {
                this.setState({
                  hotTabsIndex1: this.state.hotTabsIndex1 + 10
                });
              }
            } else if (indexType === 'hotTabsIndex2') {
              if (this.state.hotTabsIndex2 >= 50 && this.state.hotTabsIndex2 < 100) {
                this.setState({
                  hotTabsIndex2: this.state.hotTabsIndex2 + 10
                });
              }
            } else if (indexType === 'hotTabsIndex3') {
              if (this.state.hotTabsIndex3 >= 100 && this.state.hotTabsIndex3 < 150) {
                this.setState({
                  hotTabsIndex3: this.state.hotTabsIndex3 + 10
                });
              }
            } else if (indexType === 'hotTabsIndex4') {
              if (this.state.hotTabsIndex4 >= 150 && this.state.hotTabsIndex4 < 200) {
                this.setState({
                  hotTabsIndex4: this.state.hotTabsIndex4 + 10
                });
              }
            } else if (indexType === 'hotTabsIndex5') {
              if (this.state.hotTabsIndex5 >= 200 && this.state.hotTabsIndex5 <= 250) {
                this.setState({
                  hotTabsIndex5: this.state.hotTabsIndex5 + 10
                });
              }
            }

            this.setState({
              [arrType]: moviesList
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

  checkMore = (indexType, data, callback) => {
    const movies = data.subjects;
    if (this.state.initPage === 0) {
      if (!movies.length || (this.state[indexType] + data.count >= 50)) {
        callback && callback('isBottom')
        this.setState({
          hotTabsMore1: false
        })
      }
    } else if (this.state.initPage === 1) {
      if (!movies.length || (this.state[indexType] + data.count >= 100)) {
        callback && callback('isBottom')
        this.setState({
          hotTabsMore2: false
        })
      }
    } else if (this.state.initPage === 2) {
      if (!movies.length || (this.state[indexType] + data.count >= 150)) {
        callback && callback('isBottom')
        this.setState({
          hotTabsMore3: false
        })
      }
    } else if (this.state.initPage === 3) {
      if (!movies.length || (this.state[indexType] + data.count >= 200)) {
        callback && callback('isBottom')
        this.setState({
          hotTabsMore4: false
        })
      }
    } else if (this.state.initPage === 4) {
      if (!movies.length || (this.state[indexType] + data.count >= 250)) {
        callback && callback('isBottom')
        this.setState({
          hotTabsMore5: false
        })
      }
    }

  }

  loadMoreMovie = (callback) => {
    if (this.state.initPage === 0) {
      this.state.hotTabsMore1 ? this.requestMethod('top250Rank', this.state.hotTabsIndex1, 10, 'hotTabsIndex1', 'hotTabs1', callback) : callback('isBottom');
    } else if (this.state.initPage === 1) {
      this.state.hotTabsMore2 ? this.requestMethod('top250Rank', this.state.hotTabsIndex2, 10, 'hotTabsIndex2', 'hotTabs2', callback) : callback('isBottom');
    } else if (this.state.initPage === 2) {
      this.state.hotTabsMore3 ? this.requestMethod('top250Rank', this.state.hotTabsIndex3, 10, 'hotTabsIndex3', 'hotTabs3', callback) : callback('isBottom');
    } else if (this.state.initPage === 3) {
      this.state.hotTabsMore4 ? this.requestMethod('top250Rank', this.state.hotTabsIndex4, 10, 'hotTabsIndex4', 'hotTabs4', callback) : callback('isBottom');
    } else if (this.state.initPage === 4) {
      this.state.hotTabsMore5 ? this.requestMethod('top250Rank', this.state.hotTabsIndex5, 10, 'hotTabsIndex5', 'hotTabs5', callback) : callback('isBottom');
    }
  }

  handleChangeTabs = (tab, index) => {
    this.setState({
      initPage: index
    });

    if (index === 0) {
      this.setState({
        allMoviesList: JSON.parse(JSON.stringify(this.state.hotTabs1))
      })
    } else if (index === 1) {
      if (!this.state.isHotTabsReq2) {
        this.setState({
          isHotTabsReq2: true,
          allMoviesList: []
        });
        this.requestMethod('top250Rank', 50, 10, 'hotTabsIndex2', 'hotTabs2');
      } else {
        this.setState({
          allMoviesList: JSON.parse(JSON.stringify(this.state.hotTabs2))
        })
      }
    } else if (index === 2) {
      if (!this.state.isHotTabsReq3) {
        this.setState({
          isHotTabsReq3: true,
          allMoviesList: []
        });
        this.requestMethod('top250Rank', 100, 10, 'hotTabsIndex3', 'hotTabs3');
      } else {
        this.setState({
          allMoviesList: JSON.parse(JSON.stringify(this.state.hotTabs3))
        })
      }
    } else if (index === 3) {
      if (!this.state.isHotTabsReq4) {
        this.setState({
          isHotTabsReq4: true,
          allMoviesList: []
        });
        this.requestMethod('top250Rank', 150, 10, 'hotTabsIndex4', 'hotTabs4');
      } else {
        this.setState({
          allMoviesList: JSON.parse(JSON.stringify(this.state.hotTabs4))
        })
      }
    } else if (index === 4) {
      if (!this.state.isHotTabsReq5) {
        this.setState({
          isHotTabsReq5: true,
          allMoviesList: []
        });
        this.requestMethod('top250Rank', 200, 10, 'hotTabsIndex5', 'hotTabs5');
      } else {
        this.setState({
          allMoviesList: JSON.parse(JSON.stringify(this.state.hotTabs5))
        })
      }
    }
  }

  TabExample = () => {
    const tabs = [
      { title: '1-50' },
      { title: '51-100' },
      { title: '101-150' },
      { title: '151-200' },
      { title: '201-250' },
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
                <MovieCard
                  key={index}
                  cardList={this.state.allMoviesList}
                  loadMoreMovie={this.loadMoreMovie}
                  isRefresh={true}
                  pTop={ 0 }
                  { ...this.props } />
              );
            })
          }
        </Tabs>
      </div>
    );
  }

  render() {
    return (
      <div className="top250" style={{ paddingTop: '50px' }}>
        <Header
          titleText={'豆瓣 Top250'}
          {...this.props} />
        {this.TabExample()}
      </div>
    )
  }
}

export default Top250;