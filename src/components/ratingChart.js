import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../assets/style/star/rating.scss';


class RatingChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starGroup1: ['☆', '☆', '☆', '☆', '☆'],
      starGroup2: ['☆', '☆', '☆', '☆'],
      starGroup3: ['☆', '☆', '☆'],
      starGroup4: ['☆', '☆'],
      starGroup5: ['☆'],
      everyScoreArr: [],
      preWidth: 0
    }
  }

  static defaultProps = {
    details: {}
  }

  static propTypes = {
    details: PropTypes.object
  }

  componentDidMount() {
    try {
      const preWidth = document.querySelector('.star-pre').offsetWidth || this.payMoneyRef.offsetWidth;
      this.setState({
        preWidth: preWidth
      });
    } catch (e) { }
  }

  componentWillReceiveProps(nextProps) {
    let scoreObj = nextProps.details;
    let totalScore = 0;
    let everyScore = [];
    for (let score in scoreObj) {
      totalScore += scoreObj[score];
    }

    if (totalScore) {
      for (let k in scoreObj) {
        everyScore.push(scoreObj[k] / totalScore)
      }
    } else {
      everyScore = [0, 0, 0, 0, 0]
    }

    

    this.setState({
      everyScoreArr: everyScore
    })
  }

  render() {
    const { starGroup1, starGroup2, starGroup3, starGroup4, starGroup5 } = this.state;
    let everyScore = this.state.everyScoreArr;
    const preWidth = this.state.preWidth;
    return (
      <div className="rating-chart">
        <div className="star-group">
          <div className="group-1 star-height">
            {
              starGroup1.map((star1, index1) => {
                return (
                  <span key={index1}>{star1}</span>
                );
              })
            }
          </div>
          <div className="group-2 star-height">
            {
              starGroup2.map((star2, index2) => {
                return (
                  <span key={index2}>{star2}</span>
                );
              })
            }
          </div>
          <div className="group-3 star-height">
            {
              starGroup3.map((star3, index3) => {
                return (
                  <span key={index3}>{star3}</span>
                );
              })
            }
          </div>
          <div className="group-4 star-height">
            {
              starGroup4.map((star4, index4) => {
                return (
                  <span key={index4}>{star4}</span>
                );
              })
            }
          </div>
          <div className="group-5 star-height">
            {
              starGroup5.map((star5, index5) => {
                return (
                  <span key={index5}>{star5}</span>
                );
              })
            }
          </div>
        </div>
        <div className="star-pre" ref={(ref) => this.payMoneyRef = ref}>
          {
            everyScore.map((score, index) => {
              return (
                <div className="group" key={index}>
                  <div className="on-light" style={{ width: score === 0 ? score : preWidth * score }}></div>
                  <div className="percentage">{ ((score - 0) * 100).toFixed(2) }%</div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default RatingChart;