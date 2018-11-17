import React, { Component } from 'react';
import { getAllReviews } from '../../store/actions/movie-detail';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    return(
      <div className="short-comment">
        这是电影短评区域
      </div>
    );
  }
}

export default ShortComment;