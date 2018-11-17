import React, { Component } from 'react';
import { getCelebrity, getCelebrityWorks } from '../../store/actions/celebrity';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from '../../util';
import Header from '../../components/Header';

function mapDispatchToProps(dispatch) {
  return {
    getCelebrity: bindActionCreators(getCelebrity, dispatch),
    getCelebrityWorks: bindActionCreators(getCelebrityWorks, dispatch),
  }
}

@connect(state => ({
}), mapDispatchToProps)
class Celebrity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailId: '',
      celebrity: {},
      avatar: ''
    }
  }

  componentDidMount() {
    const { pathname } = this.props.history.location;
    let detailId = pathname.split('/')[2];
    this.setState({
      detailId: detailId
    });

    this.getCelebrity(detailId)
  }

  getCelebrity = (id) => {
    this.props.getCelebrity(id, data => {
      console.log(data)
      this.setState({
        celebrity: Object.assign({}, data),
        avatar: $.replaceUrl(data.avatars.small)
      })
    })
  }

  avatarIntroRender = (detail) => {
    return (
      <div className="celebrity-avatar-wrap">
        <img src={ this.state.avatar } alt="" className="caw-avatar"/>
        <div className="caw-userinfo">
          <div className="caw-user-cname"></div>
          <div className="caw-user-ename"></div>
          <div className="caw-user-attention"></div>
          <div className="caw-user-attbtn"></div>
        </div>
      </div>
    );
  }

  render() {
    const { celebrity } = this.state;
    return(
      <div className="short-comment">
        <Header 
          titleText={ celebrity.name } />
        { this.avatarIntroRender(celebrity) }
      </div>
    );
  }
}

export default Celebrity;