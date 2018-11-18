import React, { Component } from 'react';
import { getAllReviews } from '../../store/actions/movie-detail';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RatingList from '../../components/ratingList';
import Header from '../../components/Header';

function mapDispatchToProps(dispatch) {
  return {
    getAllReviews: bindActionCreators(getAllReviews, dispatch),
    // getAllComments: bindActionCreators(getAllComments, dispatch),
  }
}

@connect(state => ({
}), mapDispatchToProps)
class ShortComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailId: '',
      ratingType: '',
      ratingList: [],
      reduceHeight: 0,
      ratingIndex: 0,
      count: 20,
      ratingMore: true,
    }
  }

  componentDidMount() {
    const { pathname } = this.props.history.location;
    let detailId = pathname.split('/')[2];
    let ratingType = pathname.split('/')[3];
    this.setState({
      detailId: detailId,
      ratingType: ratingType
    });

    this.requestMethod('getAllReviews', detailId, ratingType, this.state.ratingIndex, this.state.count, 'ratingIndex', 'ratingList')
  }

  checkMore = (indexType, data, callback) => {
    const movies = data[this.state.ratingType] || [];
    if (!movies.length || this.state[indexType] + data.count > data.total) {
      callback && callback('isBottom')
      this.setState({
        ratingMore: false
      });
    }
  }

  requestMethod = (postMethod, id, ratingType, start = 0, count = 20, indexType, arrType, callback) => {
    this.props[postMethod](id, ratingType, start, count, async (data) => {
      let movieComents = data[this.state.ratingType] || [];
      this.checkMore(indexType, data, callback)
      try {
        if (Object.prototype.toString.call(movieComents) === '[object Array]') {
          await new Promise((resolve, reject) => {
            resolve();
            this.state[arrType].push(...movieComents);
            this.setState({
              [arrType]: JSON.parse(JSON.stringify(this.state[arrType])),
              [indexType]: this.state[indexType] + 20
            });
          });

        }
      } catch (e) { }
    });
  }

  loadMoreMovie = (callback) => {
    this.state.ratingMore ? this.requestMethod('getAllReviews', this.state.detailId, this.state.ratingType, this.state.ratingIndex, this.state.count, 'ratingIndex', 'ratingList', callback) : callback('isBottom');
  }

  ratingListRender = () => {
    console.log(this.state.ratingList, 'ratingList')
    return (
      <RatingList
        reduceHeight={51}
        loadMoreMovie={this.loadMoreMovie}
        movieLists={this.state.ratingList}
        ratingType={ this.state.ratingType }
        {...this.props} />
    );
  }

  render() {

    return(
      <div className="short-comment" style={{ padding: '0 15px', paddingTop: '40px',  }}>
        <Header 
          titleText="全部短评"
          { ...this.props } />
        { this.ratingListRender() }
      </div>
    );
  }
}

export default ShortComment;