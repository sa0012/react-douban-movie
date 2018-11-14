import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import {
  PullToRefresh,
  Toast
} from 'antd-mobile';
import PropTypes from 'prop-types';
import {
  top250Rank,
  usBoxRank,
  weeklyRank,
  newMoviesRank
} from '../../store/actions/movie-rank';
import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';

import $ from '../../util';

import Search from '../../components/search';
import RankCard from '../../components/rankCard';

function mapDispatchToProps(dispatch) {
  return {
    top250Rank: bindActionCreators(top250Rank, dispatch),
    usBoxRank: bindActionCreators(usBoxRank, dispatch),
    weeklyRank: bindActionCreators(weeklyRank, dispatch),
    newMoviesRank: bindActionCreators(newMoviesRank, dispatch),
  }
}

@connect(state => ({

}), mapDispatchToProps)
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: [
        {
          desc: '豆瓣 Top250',
          rating: '8分以上好电影',
          image: [],
          background: 'linear-gradient(#E1A708,#EFD491)',
          link: '/ranking/top250'
        },
        {
          desc: '本周口碑榜',
          image: [],
          background: 'linear-gradient(#32C05E,#A1E5BE)',
          link: '/ranking/weekly'
        },
        {
          desc: '新片榜',
          image: [],
          background: 'linear-gradient(#A361C3,#D9B9E8)',
          link: '/ranking/newMovies'
        },
        {
          desc: '北美票房榜',
          rating: '票房最高排名',
          image: [],
          background: 'linear-gradient(#DD7286,#F3B9C5)',
          link: '/ranking/usBox'
        }
      ]
    };
  }

  componentDidMount() {
    const {
      top250Rank,
      usBoxRank,
      weeklyRank,
      newMoviesRank
    } = this.props;

    this.allFetch()
  }

  allFetch = () => {
    Toast.loading('正在请求中...', 0, false);
    Promise.all([ 
      this.top250Render(),
      this.usBoxRender(),
      this.weeklyRender(), 
      this.newMoviesRender()
    ]).then(res => {
      Toast.hide();
    })
  }

  top250Render = () => {
    return new Promise((resolve, reject) => {
      this.props.top250Rank(0, 3, (data) => {
        resolve();
        let cardList_top250 = this.state.cardList;
        let movies = data.subjects || [];
        movies.forEach((item, index) => {
          cardList_top250[0].image.push($.replaceUrl(item.images.small))
        });

        this.setState({
          cardList: cardList_top250
        })
      })
    })
  }

  usBoxRender = () => {
    return new Promise((resolve, reject) => {
      this.props.usBoxRank(data => {
        resolve();
        let cardList_usBox = this.state.cardList;
        let movies = data.subjects || [];
        cardList_usBox[3].image[0] = $.replaceUrl(movies[0].subject.images.small);
        cardList_usBox[3].image[1] = $.replaceUrl(movies[1].subject.images.small);
        cardList_usBox[3].image[2] = $.replaceUrl(movies[2].subject.images.small);

        this.setState({
          cardList: cardList_usBox
        })
      })
    })
  }

  weeklyRender = () => {
    return new Promise((resolve, reject) => {
      this.props.weeklyRank((data) => {
        resolve()
        let cardList_weekly = this.state.cardList;
        let movies = data.subjects || [];
        cardList_weekly[1].image[0] = $.replaceUrl(movies[0].subject.images.small);
        cardList_weekly[1].image[1] = $.replaceUrl(movies[1].subject.images.small);
        cardList_weekly[1].image[2] = $.replaceUrl(movies[2].subject.images.small);

        this.setState({
          cardList: cardList_weekly
        })
      })
    })
  }

  newMoviesRender = () => {
    return new Promise((resolve, reject) => {
      this.props.newMoviesRank((data) => {
        resolve()
        let cardList_newMovies = this.state.cardList;
        let movies = data.subjects || [];
        cardList_newMovies[2].image[0] = $.replaceUrl(movies[0].images.small);
        cardList_newMovies[2].image[1] = $.replaceUrl(movies[1].images.small);
        cardList_newMovies[2].image[2] = $.replaceUrl(movies[2].images.small);

        this.setState({
          cardList: cardList_newMovies
        })
      })
    })
  }

  render() {
    return ( <div className = "ranking" >
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: '#fff' }}>
          <Search { ...this.props } />
        </div>
        <RankCard cardList={ this.state.cardList } />
      </div>);
    }
  }

  export default About;