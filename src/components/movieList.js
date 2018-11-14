import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh } from 'antd-mobile';
import PropTypes from 'prop-types';
import Star from './star';
import $ from '../util';
import '../assets/style/movieList/index.scss';

class movieList extends Component {
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
    needDay: false
  }

  static propTypes = {
    reduceHeight: PropTypes.number.isRequired,
    movieLists: PropTypes.array,
    loadMoreMovie: PropTypes.func,
    damping: PropTypes.number,
    needDay: PropTypes.bool
  }

  componentDidMount() {
    try {
      const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop - 154;
      setTimeout(() => {
        this.setState({
          height: hei
        })
      }, 0);
    } catch(e) {}
  }

  // 父组件传递异步数据， 子组件需要在这个生命周期中接收
  componentWillReceiveProps(nextProps) {
    let clientHeight = document.body.clientHeight && document.documentElement.clientHeight;
    this.setState({
      clientHeight: clientHeight - nextProps.reduceHeight,
      height: clientHeight - nextProps.reduceHeight
    });
  }

  needDate = (date) => {
    if (date) {
      return (
        <div className="date">
          <span style={{ marginRight: '15px' }}>{ date }</span>
          <span>{ date && $.getDay(date) }</span>
        </div>
      );
    }
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

  toDetailPage = (id) => {
    this.props.history.push(`/movie/${ id }`)
  }

  render() {
    const { movieLists } = this.props;
    let moviesArr = movieLists || [];
    // let moviesArr = [];
    return (
      <div>
        {
          moviesArr.length > 0 ? (
            <PullToRefresh
              damping={ this.state.damping }
              ref={el => this.ptr = el}
              style={{
                height: this.state.height,
                overflow: 'auto',
              }}
              indicator={{ deactivate: '上拉可以刷新' }}
              direction='up'
              refreshing={this.state.refreshing}
              onRefresh={ this.loadMoreMovies }
            >
              <ul className="movie-list">
                {
                  moviesArr.map((movie, index) => {
                    return (
                      <li className="movie-item" key={ index } onClick={ () => this.toDetailPage(movie.id) }>
                        { this.props.needDay && this.needDate( movie.mainland_pubdate ) }
                        <div className="item">
                          <div className="info-img">
                            <img src={ $.replaceUrl(movie.images.medium) } style={{ width: '80px', height: '120px' }} />
                          </div>
                          <div className="info-desc">
                            <p className="title">{ movie.title }</p>
                            <Star 
                              size={ 24 }
                              score={ movie.rating.average }
                              showScore={ true }
                              needNullStar={ movie.rating.average ? true : false } /> 
                            <div className="director">导演: { 
                              (movie.directors || []).map((director, i) => {
                                return <span key={ i }>{ director.name }{ i !== (movie.directors.length - 1) ? '/' : '' }</span>;
                              })
                            }</div>
                            <div className="casts">主演: {
                              (movie.casts || []).map((cast, j) => {
                                return <span key={ j }>{ cast.name }{ j !== (movie.casts.length - 1) ? '/' : '' }</span>;
                              })
                            }</div>
                            <div className="hasWatched">{ movie.collect_count }人看过</div>
                          </div>
                        </div>
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
            <div style={{ width: '100%', height: `${ this.state.clientHeight }px`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>不好意思没有数据了</div>
          )
        }
      </div>
    );
  }
}

export default movieList;