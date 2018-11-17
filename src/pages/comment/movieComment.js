import React, { Component } from 'react';
import { getAllComments } from '../../store/actions/movie-detail';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapDispatchToProps(dispatch) {
  return {
    getAllComments: bindActionCreators(getAllComments, dispatch),
  }
}

@connect(state => ({
}), mapDispatchToProps)
class MovieComment extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  render() {
    return(
      <div className="short-comment">
        这是电影评论区域
      </div>
    );
  }
}

export default MovieComment;