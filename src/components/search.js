import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/style/search/search.scss';
import logo from '../assets/images/douban-logo.png';

class Search extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  toPageSearch = () => {
    this.props.history.push('/search');
  }

  render () {
    return (
      <div className="go-search">
        <div className="logo">
          <img src={ logo } alt="logo" style={{ width: '35px', height: '35px' }} />
        </div>
        <div className="search-content" onClick={ () => this.toPageSearch() }>
          <span className="icon-search"></span>
          <span>电影/影人/标签</span>
        </div>
      </div>
    );
  }
}

export default Search;
