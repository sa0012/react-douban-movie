import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import $ from '../util';
import '../assets/style/celebrity/filmerCard.scss';

class FilmerCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filmerList: [],
      height: document.documentElement.clientHeight,
    }
  }

  static defaultProps = {
    filmerList: []
  }

  static propTypes = {
    filmerList: PropTypes.array,
  }

  toDetailPage = (id) => {
    this.props.history.push(`/celebrity/${ id }`)
  }

  filmerListItem = (filmer = []) => {
    return filmer.length > 0 ? (
      <ul className="filmer-list">
           {
              filmer.map((filmer, index) => {
                return (
                  <li className="filmer-item" key={ index } onClick={ () => this.toDetailPage(filmer.id) }>
                    <div className="info-img">
                      <img src={ $.replaceUrl(filmer.avatars.medium) } style={{ width: '80px', height: '120px' }} />
                    </div>
                    <div className="filmer-mes">
                      <div className="filmer-name"> { filmer.name } </div>
                      <div className="filmer-professions">
                        <div className="filmer-professions-title">职业：</div>
                        <div className="filmer-professions-wrap">
                          {
                            filmer.professions.length > 0 && filmer.professions.map((prof, proIndex) => {
                              return (
                                <span key={ proIndex }>{ prof }{ proIndex !== (filmer.professions.length - 1) && `/` }</span>
                              )
                            })
                          }
                        </div>
                      </div>
                      <div className="filmer-professions">
                        <div className="filmer-professions-title">代表作：</div>
                        <div className="filmer-professions-wrap">
                          {
                            filmer.works.length > 0 && filmer.works.map((work, wIndex) => {
                              return (
                                <span key={ wIndex }>{ work.subject.title }{ wIndex !== (filmer.works.length - 1) && `/` }</span>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })
           }
          </ul>
    ) : (
      <div style={{ width: '100%', height: `${ this.state.clientHeight }px`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>不好意思没有数据了</div> 
    )
  }

  render() {
    return (
      <div className={ classNames({ 'movie-card': this.props.isRefresh }) }>
        { this.filmerListItem(this.props.filmerList) }
      </div>
    );
  }
}

export default FilmerCard;