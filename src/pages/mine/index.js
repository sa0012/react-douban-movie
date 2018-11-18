import React, { Component } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from '../../assets/images/avatar.jpg';
import '../../assets/style/userInfo/index.scss';

import {increment } from '../../store/action'
import { movie_show } from '../../store/actions/movie-show';
function mapDispatchToProps(dispatch) {
  return {
    increment: bindActionCreators(increment, dispatch),
    movie_show: bindActionCreators(movie_show, dispatch),
  }
}

@connect(state => ({
  count: state.count,
}), mapDispatchToProps)
class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // static defaultProps = {
  //   addWishMovieReducer: {},
  //   lessWishMovieReducer: {},
  //   addSeenMovieReducer: {},
  //   lessSeenMovieReducer: {},
  // }

  // static propTypes = {
  //   addWishMovieReducer: PropTypes.object,
  //   lessWishMovieReducer: PropTypes.object,
  //   addSeenMovieReducer: PropTypes.object,
  //   lessSeenMovieReducer: PropTypes.object,
  // }

  componentDidMount() {

  }

  TabExample = () => {
    const tabs = [
      { title: '想看' },
      { title: '看过' },
      { title: '影人' },
    ];
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
                    <div 
                    style={{ width: '100px', height: '40px', textAlign: 'center', lineHeight: '40px', backgroundColor: 'green' }}
                    onClick={ () => this.handleclick() }>{ item.title }</div>
                  </div>
                );
              })
            }
          </Tabs>
        <WhiteSpace />
        {/* <NavBar /> */}
      </div>
    );
  }

  handleclick = () => {
    // this.props.increment(10, 'increment')
    this.props.movie_show({
      count: 10,
      id: 1299999
    })
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