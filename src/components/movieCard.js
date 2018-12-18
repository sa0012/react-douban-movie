import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { PullToRefresh } from 'antd-mobile';
import Star from './star';
import $ from '../util';
import classNames from 'classnames';
import '../assets/style/rankCard/movieCard.scss';


class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      refreshing: false,
      down: false,
      height: document.documentElement.clientHeight,
      damping: 60,
      isBottom: false
    }
  }

  static defaultProps = {
    cardList: [],
    loadMoreMovie: Function,
    isRefresh: false,
    pTop: 60
  }

  static propTypes = {
    cardList: PropTypes.array,
    loadMoreMovie: PropTypes.func,
    isRefresh: PropTypes.bool,
    pTop: PropTypes.number
  }

  componentDidMount() {
    try {
      const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop - 100;
      setTimeout(() => {
        this.setState({
          height: hei
        })
      }, 0);
    } catch(e) {}
  }

  // componentWillReceiveProps(nextProps) {
  //   let clientHeight = document.body.clientHeight && document.documentElement.clientHeight;
  //   this.setState({
  //     clientHeight: clientHeight - nextProps.reduceHeight,
  //     height: clientHeight - nextProps.reduceHeight
  //   });
  // }

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

  movieListItem = (movies = []) => {
    return movies.length > 0 ? (
      <ul className={ classNames({
        'movie-list': true,
        'no-refresh': !this.props.isRefresh
      }) } style={{ paddingTop: `${this.props.pTop}px` }}>
        {
          movies.map((movie, index) => {
            movie = movie.subject ? movie.subject : movie;
            return (
              <li className="movie-item" key={ index } onClick={ () => this.toDetailPage(movie.id) }>
                <div className={ classNames({
                  'item': true,
                  'is-border': index !== movies.length - 1
                }) }>
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
    ) : (
      <div style={{ width: '100%', height: `${ this.state.clientHeight }px`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>不好意思没有数据了</div> 
    )
  }

  movieListRender = (movieList) => {
    if (this.props.isRefresh) {
      return (
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
          { this.movieListItem(movieList) }
        </PullToRefresh>
      );
    } else {
      return this.movieListItem(movieList);
    }
  }

  render() {
    return (
      <div className={ classNames({ 'movie-card': this.props.isRefresh }) }>
        { this.movieListRender(this.props.cardList) }
      </div>
    );
  }
}

export default MovieCard;