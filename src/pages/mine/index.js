import React, { Component } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from '../../assets/images/avatar.jpg';
import '../../assets/style/userInfo/index.scss';
import {increment } from '../../store/action'
import { movie_show } from '../../store/actions/movie-show';
import MovieCard from '../../components/movieCard';
import FilmerCard from '../../components/filmerCard';

function mapDispatchToProps(dispatch) {
  return {
    increment: bindActionCreators(increment, dispatch),
    movie_show: bindActionCreators(movie_show, dispatch),
  }
}

@connect(state => ({
  count: state.count,
  wishMovieList: state.wishMovieList,
  seenMovieList: state.seenMovieList,
  filmMarkerList: state.filmMarkerList,
}), mapDispatchToProps)
class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static defaultProps = {
    wishMovieList: [],
    seenMovieList: [],
    filmMarkerList: [],
  }

  static propTypes = {
    wishMovieList: PropTypes.array,
    seenMovieList: PropTypes.array,
    filmMarkerList: PropTypes.array,
  }

  componentDidMount() {
    console.log(this.props.wishMovieList, 'wishmovielist')
  }

  TabExample = () => {
    const tabs = [
      { title: '想看' },
      { title: '看过' },
      { title: '影人' },
    ];

    const { wishMovieList, seenMovieList, filmMarkerList } = this.props;
    return (
      <div>
        <WhiteSpace />
          <Tabs 
            tabs={tabs}
            initialPage={0}
            tabBarUnderlineStyle={{ borderColor: '#42bd56' }}
            tabBarActiveTextColor="#42bd56"
            tabBarInactiveTextColor="#666"
            initalPage={'t2'}
          >
            {
              tabs.map((item, index) => {
                return (
                  <div key={ index }>
                    {
                      index === 0 ? (
                        <div style={{ paddingBottom: '60px' }}>
                          <MovieCard 
                            cardList={ wishMovieList }
                            loadMoreMovie={ this.loadMoreWish }
                            pTop={ 0 }
                            { ...this.props } />
                        </div>
                      ) : index === 1 ? (
                        <div style={{ paddingBottom: '60px' }}>
                          <MovieCard 
                            cardList={ seenMovieList }
                            loadMoreMovie={ this.loadMoreWish }
                            pTop={ 0 }
                            { ...this.props } />
                        </div>
                      ) : (
                        <div style={{ paddingBottom: '60px' }}>
                          <FilmerCard 
                            filmerList={ filmMarkerList }
                            { ...this.props }/>
                        </div>
                      )
                    }
                  </div>
                );
              })
            }
          </Tabs>
        <WhiteSpace />
      </div>
    );
  }

  loadMoreWish = (callback) => {
    callback && callback();
  }

  topAvatar = () => {
    return (
      <div className="user">
        <div className="avatar">
          <img src={ Avatar } alt="avatar" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
        </div> 
        <div className="name">豆瓣用户</div>
      </div>
    );
  }

  render() {
    return(
      <div className="info">
        { this.topAvatar() }
        { this.TabExample() }
      </div>
    )
  }
}

export default Info;