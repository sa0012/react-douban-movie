import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../assets/style/header.scss'

class Header extends Component {
  static propTypes = {
    leftItem: PropTypes.func,
    titleItem: PropTypes.func,
    rightItem: PropTypes.func,
    leftText: PropTypes.string,
    titleText: PropTypes.string,
    rightText: PropTypes.string,
    bgColor: PropTypes.string
  };
  
  constructor (props) {
    super(props);
  }

  componentDidMount () {

  }

  onBack = () => {
    this.props.history.goBack();
  }

  renderLeftItem = () => {
    if (!this.props.leftItem) {
      return <i className="iconfont icon-back header-back" onClick={ () => this.onBack() }></i>;
    } else {
      return this.props.leftItem();
    }
  }

  renderTitleItem = () => {
    if (!this.props.titleItem) {
      return this.props.titleText;
    } else {
      return this.props.titleItem();
    }
  }

  renderRightItem = () => {
    if (!this.props.rightItem) return
    return this.props.rightItem();
  }

  render () {
    return (
      <div className="header" style={{ backgroundColor: this.props.bgColor }}>
        <div className="left-item">
          { this.renderLeftItem() }
        </div>
        <div className="title-item">
          { this.renderTitleItem() }
        </div>
        <div className="right-item">
          { this.renderRightItem() }
        </div>
      </div>
    )
  }
}


export default Header;