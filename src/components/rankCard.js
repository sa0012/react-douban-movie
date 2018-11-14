import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../assets/style/rankCard/index.scss';

class RankCard extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    cardList: []
  }

  static propTypes = {
    movieList: PropTypes.array
  }

  componentDidMount() {

  }

  cardItem = (cardList) => {
    if (cardList && cardList.length > 0) {
      return cardList.map((card, index) => {
        return (
          <div className="card-wrap" style={{ background: card.background }} key={ index }>
            <Link to={ card.link } className="rank-item" >
              <div className="desc">
                <h2 className="name">{ card.desc }</h2>
                <span className="brief">{ card.rating }</span>
              </div>
              <div className="rank-img">
                {
                  card.image && card.image.length > 0 ? card.image.map((image, index) => {
                    return <img src={ image } key={ index } className={ classNames({
                      top: index === 1
                    }) } alt=""/>
                  }) : ''
                }
              </div>
            </Link>
          </div>
        );
      })
    }
  }

  render() {
    const { cardList } = this.props || [];
    
    return (
      <div className="rank-card" style={{ marginBottom: '80px', marginTop: '60px' }}>
        <h3 style={{ paddingLeft: '15px', fontSize: '18px', fontWeight: '400' }}>精选榜单</h3>
        {
          cardList && cardList.length > 0 ? this.cardItem(cardList) : (
            <div>没有数据了</div>
          )
        }
      </div>
    );
  }
}

export default RankCard;