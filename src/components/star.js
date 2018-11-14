import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import '../assets/style/star/index.scss';

const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

class Star extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    size: 36,
    score: 0,
    showScore: false,
    needNullStar: false
  }

  static propTypes = {
    size: PropTypes.number,
    score: PropTypes.number,
    showScore: PropTypes.bool,
    needNullStar: PropTypes.bool
  }

  componentDidMount() {

  }

  normalizeScore = () => {
    let len = this.props.size.toString().length;
    if (len < 2) {
      return `${ this.props.score }.0`;
    }
    return this.props.score;
  }

  starType = () => {
    return `star-${ this.props.size }`;
  }

  itemClasses = () => {
    let result = [];
    let score = Math.floor(this.props.score) / 2;
    let hasDecimal = score % 1 !== 0;
    let interger = Math.floor(score);
    for (let i = 0; i < interger; i++) {
      result.push(CLS_ON);
    }
    if (hasDecimal) {
      result.push(CLS_HALF);
    }
    while (result.length < LENGTH) {
      result.push(CLS_OFF);
    }
    return result;
  }

  renderStar = () => {
    let starArr = this.itemClasses();
    if ( this.props.score || this.props.needNullStar ) {
      return starArr.map((item, index) => {
        return (
          <span className={ classnames('star-item', `${ item }`) } key={ index }></span>
        );
      });
    }
  }

  noScore = () => {
    if (!this.props.score) {
      return (
        <span className={ classnames({
          'no-score': true,
          'block': this.props.needNullStar
        }) }>暂无评分</span>
      );
    }
  }

  hasScore = () => {
    if (this.props.showScore && this.props.score) {
      return (
        <span className="show-score">{ this.normalizeScore() }</span>
      );
    }
  }

  render() {
    const { size, score, showScore, needNullStar } = this.props;
    return (
      <div className={ classnames('star', `star-${ size }`) }>
        { this.renderStar() }
        { this.noScore() }
        { this.hasScore() }
      </div>
    );
  }
}

export default Star;