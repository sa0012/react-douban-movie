import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh } from 'antd-mobile';
import PropTypes from 'prop-types';
import Star from './star';
import $ from '../util';
import '../assets/style/comment/ratingList.scss';

class RatingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      down: false,
      height: document.documentElement.clientHeight,
      data: [],
      movies: {},
      clientHeight: 0,
      damping: 60,
      isBottom: false
    };
  }

  static defaultProps = {
    reduceHeight: 154,
    movieLists: [],
    loadMoreMovie: Function,
    damping: 60,
    needDay: false,
    ratingType: ''
  }

  static propTypes = {
    reduceHeight: PropTypes.number.isRequired,
    movieLists: PropTypes.array,
    loadMoreMovie: PropTypes.func,
    damping: PropTypes.number,
    needDay: PropTypes.bool,
    ratingType: PropTypes.string
  }

  componentDidMount() {
    try {
      const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop - 154;
      setTimeout(() => {
        this.setState({
          height: hei
        })
      }, 0);
    } catch (e) { }
  }

  // 父组件传递异步数据， 子组件需要在这个生命周期中接收
  componentWillReceiveProps(nextProps) {
    let clientHeight = document.body.clientHeight && document.documentElement.clientHeight;
    this.setState({
      clientHeight: clientHeight - nextProps.reduceHeight,
      height: clientHeight - nextProps.reduceHeight
    });
  }


  hideRefresh = (isBottom) => {
    if (isBottom === 'isBottom') {
      this.setState({
        damping: -10,
        isBottom: true
      });
    }
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000)
  }

  loadMoreMovies = () => {
    this.setState({ refreshing: true });
    this.props.loadMoreMovie(this.hideRefresh);
  }

  render() {
    const { movieLists } = this.props;
    let popularReviews = movieLists || [];
    console.log(movieLists, 'slslslslsl')
    return (
      <div>
        {
          popularReviews.length > 0 ? (
            <PullToRefresh
              damping={this.state.damping}
              ref={el => this.ptr = el}
              style={{
                height: this.state.height,
                overflow: 'auto',
              }}
              indicator={{ deactivate: '上拉可以刷新' }}
              direction='up'
              refreshing={this.state.refreshing}
              onRefresh={this.loadMoreMovies}
            >
              <ul className="movie-list">
                {
                  popularReviews.map((rating, index) => {
                    return (
                      <li className="rating-item" key={index}>
                        {
                          this.props.ratingType === 'reviews' && (
                            <div className="rating-title">{rating.title}</div>
                          )
                        }
                        <div className="rating-user-wrap">
                          <img className="rat-user-avatar" src={$.replaceUrl(rating.author.avatar)} alt="" />
                          <div className="rat-user-name">
                            <span className="avatar-name">{rating.author.name}</span>
                            <Star size={24}
                              score={(rating.rating.value - 0) * 2}
                              showScore={false}
                              needNullStar={true} />
                          </div>
                          {
                            this.props.ratingType === 'reviews' ? (
                              <i className="iconfont icon-collect rating-icon-edit"></i>
                            ) : (
                                <i className="iconfont icon-thumb_up rating-icon-edit"></i>
                              )
                          }
                          {
                            this.props.ratingType === 'comments' && (<span style={{ color: '#666' }}>{rating.useful_count}</span>)
                          }
                        </div>
                        <div className="rating-summary">{rating.content}</div>
                        {
                          this.props.ratingType === 'comments' && (
                            <div className="rating-date" style={{ marginTop: '10px' }}>{rating.created_at}</div>
                          )
                        }
                      </li>
                    )
                  })
                }
                {
                  this.state.isBottom && (
                    <div className="footer">
                      <span className="line-left"></span>
                      <span className="line-text">不好意思， 没有数据了</span>
                      <span className="line-left"></span>
                    </div>
                  )
                }
              </ul>
            </PullToRefresh>
          ) : (
              <div style={{ width: '100%', height: `${this.state.clientHeight}px`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>不好意思没有数据了</div>
            )
        }
      </div>
    );
  }
}

export default RatingList;