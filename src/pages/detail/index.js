import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getMovieDetail, getMovieReview, getAllReviews, getAllComments } from '../../store/actions/movie-detail';
import { addWishMovie, lessWishMovie, addSeenMovie, lessSeenMovie } from '../../store/actions/collect';
import { bindActionCreators } from 'redux';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import $ from '../../util';
import { Tabs } from 'antd-mobile';
import '../../assets/style/movieDetail/index.scss';
import '../../assets/style/movieDetail/tabs.scss';

import Header from '../../components/Header';
import Star from '../../components/star';
import RatingChart from '../../components/ratingChart';


function mapDispatchToProps(dispatch) {
  return {
    getMovieDetail: bindActionCreators(getMovieDetail, dispatch),
    getMovieReview: bindActionCreators(getMovieReview, dispatch),
    getAllReviews: bindActionCreators(getAllReviews, dispatch),
    getAllComments: bindActionCreators(getAllComments, dispatch),
    addWishMovie: bindActionCreators(addWishMovie, dispatch),
    lessWishMovie: bindActionCreators(lessWishMovie, dispatch),
    addSeenMovie: bindActionCreators(addSeenMovie, dispatch),
    lessSeenMovie: bindActionCreators(lessSeenMovie, dispatch),
  }
}

@connect(state => ({
  addWishMovieReducer: state.addWishMovieReducer,
  lessWishMovieReducer: state.lessWishMovieReducer,
  addSeenMovieReducer: state.addSeenMovieReducer,
  lessSeenMovieReducer: state.lessSeenMovieReducer,
}), mapDispatchToProps)
class MovieDetial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailId: '',
      detailContent: {},
      bannerImg: '',
      rating: {},
      allCasts: [],
      bloopers: [],
      isShowTop: false,
      commentStart: 0,
      commnetDistance: 0,
      clientHeight: Node,
      isShowRatingTabs: false,
      isFirstClickTabsChange: true,
      isCollectWish: false,
      isCollectSeen: false
    }
  }

  componentDidMount() {
    this.setState({
      clientHeight: (document.body.clientHeight || document.documentElement.clientHeight)
    });
    window.addEventListener('scroll', this.handleScroll);
    const { pathname } = this.props.history.location;
    let detailId = pathname.split('/')[2];
    this.setState({
      detailId: detailId
    });
    this.searchMovieDetail(detailId);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = (e) => {
    let top = document.documentElement.scrollTop || document.body.scrollTop;
    let clientHeight = document.querySelector('.movie-contant').offsetHeight;
    const wScrollY = window.scrollY; // 当前滚动条位置  
    const wInnerH = window.innerHeight; // 设备窗口的高度（不会变）  
    const bScrollH = document.body.scrollHeight; // 滚动条总高度   

    if (top + wInnerH >= clientHeight) {
      document.querySelector('.rating-tabs-wrap').style.position = 'initial';
      document.querySelector('.comment-tabs-wrap').style.position = 'relative';
      // document.querySelector('.rating-tabs-wrap').style.top = '51px';
      this.setState({
        isShowRatingTabs: true
      })
    } else {
      document.querySelector('.rating-tabs-wrap').style.position = 'fixed';
      document.querySelector('.comment-tabs-wrap').style.position = 'position';
      // document.querySelector('.rating-tabs-wrap').style.bottom = 0;
      this.setState({
        isShowRatingTabs: false
      })
    }
    if (top > 50) {
      this.setState({
        isShowTop: true
      })
    } else {
      this.setState({
        isShowTop: false
      })
    }
  }


  searchMovieDetail = (detailId) => {
    this.props.getMovieDetail(detailId, data => {
      let allCasts = [];
      let directors = JSON.parse(JSON.stringify(data.directors)) || [];
      let casts = JSON.parse(JSON.stringify(data.casts)) || [];

      directors.length > 0 && directors.forEach((directors, index) => {
        if (directors.avatars !== null) {
          directors.personType = '导演';
          directors.castsAvatar = $.replaceUrl(directors.avatars.small)
          allCasts.push(directors);
        }
      });


      casts.length > 0 && casts.forEach((casts, index) => {
        if (casts.avatars !== null) {
          casts.personType = '演员';
          casts.castsAvatar = $.replaceUrl(casts.avatars.small)
          allCasts.push(casts);
        }
      });

      this.setState({
        detailContent: data,
        bannerImg: data.images.small,
        rating: data.rating,
        allCasts: allCasts,
        bloopers: data.bloopers
      });
    })
  }

  contentRender = (detail) => {
    return (
      <div style={{ paddingTop: '60px' }} className="movie-contant">
        <div className="movie-mes">
          <img className="movie-img" src={$.replaceUrl(this.state.bannerImg)} alt="" />
          <div className="movie-sum">
            <div className="sum-title">{detail.title}</div>
            <div className="sum-date">{detail.original_title} ({detail.year})</div>
            <div className="movie-tags">
              {
                detail.countries && detail.countries.length > 0 && detail.countries.map((countries, i) => {
                  return i === 0 && (
                    <span key={i}>{countries} / </span>
                  );
                })
              }
              {
                detail.genres && detail.genres.length > 0 && detail.genres.map((genres, index) => {
                  return (
                    <span key={index}>{genres} </span>
                  );
                })
              }
              <span>上映时间：</span>
            </div>
            <p className="sum-content">
              {
                detail.pubdates && detail.pubdates.length > 0 && detail.pubdates.map((pubdates, j) => {
                  return j === 1 && (
                    <span key={j}>{pubdates} / </span>
                  );
                })
              }
              {
                detail.durations && detail.durations.length > 0 && detail.durations.map((durations, k) => {
                  return k === 1 && (
                    <span key={k}>{durations} </span>
                  )
                })
              }
              <i className="iconfont icon-keyboard_arrow_right sum-back"></i>
            </p>

            <div className="sum-btn">
              <div className="btn-left-wrap">
                <div className="btn-inner" onClick={() => this.collectWishMovie('wish')}>想看</div>
              </div>
              <div className="btn-right-wrap">
                <div className="btn-inner" onClick={() => this.collectWishMovie('seen')}>看过</div>
              </div>
            </div>
          </div>
        </div>
        {this.scoreRender(detail)}
        {this.wishWatch()}
        {this.movieTagsRender(detail.tags)}
        {this.movieIntroductionRender(detail.summary)}
        {this.moviePersonRender(detail)}
        {this.bloopersRender(detail)}
        {this.shortRatingRender(detail)}
      </div>
    );
  }

  collectWishMovie = async (type) => {
    if (type === 'wish') {
      await new Promise((resolve, reject) => {
        resolve();
        this.setState({
          isCollectWish: !this.state.isCollectWish
        })
      });

      await new Promise((resolve, reject) => {
        resolve();
        if (this.state.isCollectWish) {
          this.props.addWishMovie(this.state.detailContent);
        } else {
          this.props.lessWishMovie(this.state.detailContent.id);
        }
      })
    }
    if (type === 'seen') {
      console.log(this.props.addWishMovieReducer, 'state')
      this.setState({
        isCollectSeen: !this.state.isCollectSeen
      })
    }
  }

  wishWatch = () => {
    return (
      <div className="movie-score" style={{ paddingTop: 0 }}>
        <div className="score-content wish-content">
          <div className="user-msg">
            <img className="avatar" src={$.replaceUrl(this.state.bannerImg)} alt="" />
            <div className="user-left">
              <div className="user-name">我想看</div>
              <div className="user-time" style={{ color: '#666', fontSize: '12px', paddingTop: '5px' }}>刚刚</div>
            </div>
          </div>
          <div className="share-msg">
            <i className="iconfont icon-collect share-icon"></i>
            <span className="share-text">分享到微信、微博</span>
          </div>
        </div>
      </div>
    );
  }

  toTagsDetail = (tag) => {
    this.props.history.push(`/tag/${tag}`)
  }

  movieTagsRender = (tags) => {
    return (
      <div className="movie-tags" style={{ width: '100%' }}>
        <ul className="tags-list">
          <li style={{ display: 'inline-block', color: '#1F3644' }}>所属频道：</li>
          {
            tags && tags.length > 0 && tags.map((tag, index) => {
              return (
                <li
                  className={classNames({
                    'tags-item': true,
                    'is-right': index !== tags.length - 1
                  })}
                  key={index}
                  onClick={() => this.toTagsDetail(tag)}>
                  <span className="tags-text">{tag}</span>
                  <i className="iconfont icon-keyboard_arrow_right tags-icon"></i>
                </li>
              );
            })
          }

        </ul>
      </div>
    );
  }

  movieIntroductionRender = (summary) => {
    return (
      <div className="movie-introduction">
        <h3 className="introduction-title">简介</h3>
        <p className="introduction-summary">{summary}</p>
        {/* <div className="summary-eli">
          <span>展开</span>
          <i className="iconfont icon-back"></i>
        </div> */}
      </div>
    );
  }

  // 影人
  moviePersonRender = () => {
    const allCasts = this.state.allCasts;
    return (
      <div className="movie-person">
        <div className="person-top">
          <h3 className="person-title">影人</h3>
          <div className="person-text">
            <span className="text-all">全部65</span>
            <i className="iconfont icon-keyboard_arrow_right person-back"></i>
          </div>
        </div>

        <div className="movie-tags" style={{ width: '100%' }}>
          <ul className="casts-list">
            {
              allCasts && allCasts.length > 0 && allCasts.map((cast, index) => {
                return (
                  <li
                    className={classNames({
                      'casts-item': true,
                      'is-right': index !== allCasts.length - 1
                    })}
                    onClick={() => this.toCelebrityPage(cast.id)}
                    key={index}
                  >
                    <img className="casts-avatar" src={cast.castsAvatar} alt="" />
                    <div className="casts-name">{cast.name}</div>
                    <div className="casts-type">{cast.personType}</div>
                  </li>
                );
              })
            }

          </ul>
        </div>
      </div>
    );
  }

  toCelebrityPage = (id) => {
    this.props.history.push(`/celebrity/${id}`)
  }

  // 花絮
  bloopersRender = () => {
    const bloopers = this.state.bloopers;
    return (
      <div className="movie-person">
        <div className="person-top">
          <h3 className="person-title">花絮</h3>
          <div className="person-text">
            <span className="text-all">全部65</span>
            <i className="iconfont icon-keyboard_arrow_right person-back"></i>
          </div>
        </div>

        <div className="movie-tags" style={{ width: '100%' }}>
          <ul className="casts-list">
            {
              bloopers && bloopers.length > 0 && bloopers.map((cast, index) => {
                return (
                  <li
                    className={classNames({
                      'casts-item': true,
                      'is-right': index !== bloopers.length - 1
                    })}
                    key={index}
                  >
                    <img className="video-avatar" src={$.replaceUrl(cast.small)} alt="" />
                    {/* <Video autoPlay loop muted
                      controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                      poster={ $.replaceUrl(cast.small) }
                      onCanPlayThrough={() => {
                        // Do stuff
                      }}>
                      <source src="http://sourcefile.webm" type="video/webm" />
                      <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default />
                    </Video> */}
                  </li>
                );
              })
            }

          </ul>
        </div>
      </div>
    );
  }

  // 短评
  shortRatingRender = (detail) => {
    return (
      <div className="short-rating">
        <div className="short-rating-inner">
          <div className="person-top short-top">
            <h3 className="person-title">影评</h3>
            <div className="person-text" onClick={() => this.toCommentPage('comments')}>
              <span className="text-all" style={{ color: '#666' }}>全部{detail.comments_count}</span>
              <i className="iconfont icon-keyboard_arrow_right person-back" style={{ color: '#666' }}></i>
            </div>
          </div>
          {this.ratingList(detail)}
        </div>
      </div>
    );
  }

  ratingList = (detail) => {
    const popularReviews = detail.popular_reviews || []
    return (
      <div className="rating-list">
        <ul className="rating-content">
          {
            popularReviews.length > 0 && popularReviews.map((rating, index) => {
              return (
                <li className="rating-item" key={index}>
                  <div className="rating-title">{rating.title}</div>
                  <div className="rating-user-wrap">
                    <img className="rat-user-avatar" src={$.replaceUrl(rating.author.avatar)} alt="" />
                    <div className="rat-user-name">
                      <span className="avatar-name">{rating.author.name}</span>
                      <Star size={24}
                        score={(rating.rating.value - 0) * 2}
                        showScore={false}
                        needNullStar={true} />
                    </div>
                    <i className="iconfont icon-collect rating-icon-edit"></i>
                  </div>
                  <div className="rating-summary">{rating.summary}</div>
                </li>
              );
            })
          }
        </ul>
        <div className="all-rating">
          <span className="all-rating-text" onClick={() => this.toCommentPage('comments')}>查看全部短评</span>
          <i className="iconfont icon-keyboard_arrow_right all-rating-right"></i>
        </div>
      </div>
    );
  }

  toCommentPage = (type) => {
    this.props.history.push(`/movie/${this.state.detailId}/${type}`)
  }

  scoreRender = (detail) => {
    const rating = this.state.rating;
    return (
      <div className="movie-score">
        <div className="score-content">
          <div className="score-top">
            <span className="doubn-text">
              <span className="text-sup">豆瓣评分<span className="text-pub">TM</span></span>
            </span>
            <i className="iconfont icon-keyboard_arrow_right top-back"></i>
          </div>
          <div className="score-mid-wrap">
            <div className="score-mid">
              <div className="score-num">
                <div className="score-average">{rating.average}</div>
                <Star size={36}
                  score={rating.average}
                  showScore={false}
                  needNullStar={rating.average ? true : false} />
              </div>
              <div className="score-pre">
                <RatingChart
                  details={rating.details} />
              </div>
            </div>
            <div className="rating-per">{detail.ratings_count}人参与评分</div>
          </div>
          <div className="score-bot">
            <span>{((detail.collect_count - 0) / 1000).toFixed(1)}k人想看</span>
            <span style={{ marginLeft: '10px' }}>{((detail.wish_count - 0) / 1000).toFixed(1)}k人看过</span>
          </div>
        </div>
      </div>
    );
  }

  titleItem = () => {
    const isShowTop = this.state.isShowTop;
    if (!isShowTop) {
      return (
        <div className="title-center">
          <i className="iconfont icon-video-camera"></i>
          <span style={{ marginLeft: '5px' }}>电影</span>
        </div>
      );
    }
  }

  showMovieTitle = (detail) => {
    const isShowTop = this.state.isShowTop;
    if (isShowTop) {
      return (
        <div className="movie-title-center">
          <img src={$.replaceUrl(this.state.bannerImg)} className="title-avatar" alt="" />
          <div className="title-movie-content">
            <div className="title-mc-title">{detail.title}</div>
            <Star size={24}
              score={this.state.rating.average}
              showScore={true}
              needNullStar={this.state.rating.average ? true : false} />
          </div>
        </div>
      );
    }
  }

  handleChangeTabs = (tab, index) => {
    console.log(tab, index)
    // this.setState({
    //   isShowRatingTabs: false
    // })
    // if (this.state.isFirstClickTabsChange) {
    //   this.setState({
    //     isFirstClickTabsChange: false
    //   })
    //   console.log('this is a first click')
    //   setTimeout(() => {
    //     document.querySelector('.rating-tabs-wrap').style.transform = 'translateY(-600px)';
    //   }, 300)
    // }

  }

  commentTouchStart = (e) => {
    if (this.state.isShowRatingTabs) return false;
    e.persist()
    let start = e.changedTouches[0].clientY
    this.setState({
      commentStart: start
    })
    document.body.style.overflow = document.documentElement.style.overflow = 'hidden';
  }

  commentTouchMove = (e) => {
    if (this.state.isShowRatingTabs) return false;
    let currentDisY = e.changedTouches[0].clientY;
    if (currentDisY >= 51 && currentDisY <= this.state.clientHeight) {
      document.querySelector('.rating-tabs-wrap').style.top = `${currentDisY}px`;
      // this.setState({
      //   commnetDistance: currentDisY
      // })
    }
  }

  commentTouchEnd = (e) => {
    if (this.state.isShowRatingTabs) return false;
    const halfHeight = this.state.clientHeight / 2;
    let currentDisY = e.changedTouches[0].clientY;
    document.body.style.overflow = document.documentElement.style.overflow = 'initial';
    if (currentDisY < halfHeight) {
      document.querySelector('.rating-tabs-wrap').style.top = `51px`;
      this.setState({
        isShowRatingTabs: true
      })
    } else {
      document.querySelector('.rating-tabs-wrap').style.top = `${this.state.clientHeight - 51}px`;
      this.setState({
        isShowRatingTabs: false
      })
    }
  }

  commentTabRender = (detail) => {
    const tabs = [
      { title: '影评' },
      { title: '短评' },
    ];
    return (
      <div className="rating-tabs-wrap">
        <div
          className="comment-tabs-wrap"
          ref="comment"
        // onTouchStart={this.commentTouchStart}
        // onTouchMove={this.commentTouchMove}
        // onTouchEnd={this.commentTouchEnd}
        >
          <div className="tabs-line"></div>
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
                  <div key={index}>
                    {this.firstTabs(index === 0 ? (detail.popular_reviews || []) : (detail.popular_comments || []), index)}
                  </div>
                );
              })
            }
          </Tabs>
        </div>
      </div>
    );
  }

  firstTabs = (popularReviews, tabIndex) => {
    return (
      <div>
        <ul className="rating-content" style={{ backgroundColor: '#fff', padding: '15px', color: '#666' }}>
          {
            popularReviews.length > 0 && popularReviews.map((rating, index) => {
              return (
                <li className="rating-item" key={index} style={{ margin: 0 }}>
                  {
                    tabIndex === 0 && (
                      <div className="rating-title" style={{ color: '#666' }}>{rating.title}</div>
                    )
                  }
                  <div className="rating-user-wrap" style={{ paddingBottom: '10px' }}>
                    <img className="rat-user-avatar" src={$.replaceUrl(rating.author.avatar)} alt="" />
                    <div className="rat-user-name">
                      <span className="avatar-name" style={{ color: '#666' }}>{rating.author.name}</span>
                      <Star size={24}
                        score={(rating.rating.value - 0) * 2}
                        showScore={false}
                        needNullStar={(rating.rating.value - 0) ? true : false} />
                    </div>
                    {
                      tabIndex === 0 ? (
                        <i className="iconfont icon-collect rating-icon-edit" style={{ color: '#666' }}></i>
                      ) : (
                          <i className="iconfont icon-thumb_up rating-icon-edit" style={{ color: '#666' }}></i>
                        )
                    }
                    {
                      tabIndex === 1 && (<span style={{ color: '#666' }}>{rating.useful_count}</span>)
                    }
                  </div>
                  <div className="rating-summary">{tabIndex === 0 ? rating.summary : rating.content}</div>
                  {
                    tabIndex === 1 && (
                      <div className="rating-date" style={{ marginTop: '10px' }}>{rating.created_at}</div>
                    )
                  }
                </li>
              );
            })
          }
        </ul>
        <div className="all-rating">
          <span className="all-rating-text" onClick={() => this.toCommentPage(tabIndex === 0 ? 'reviews' : 'comments')}>查看全部评论</span>
          <i className="iconfont icon-keyboard_arrow_right all-rating-right"></i>
        </div>
      </div>
    );
  }

  isLike = () => {

  }

  render() {
    const detail = this.state.detailContent;
    return (
      <div className="movie-detail">
        {this.showMovieTitle(detail)}
        <Header
          titleItem={this.titleItem}
          bgColor={'#30566B'}
          {...this.props} />
        {this.contentRender(detail)}
        {this.commentTabRender(detail)}
      </div>
    );
  }
}

export default MovieDetial;