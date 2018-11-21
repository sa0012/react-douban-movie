import React, { Component } from 'react';
import { getCelebrity, getCelebrityWorks } from '../../store/actions/celebrity';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from '../../util';
import Header from '../../components/Header';
import Star from '../../components/star';
import '../../assets/style/celebrity/index.scss';
import BgColor from '../../config/background';

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
				<img src={this.state.avatar} alt="" className="caw-avatar" />
				<div className="caw-userinfo">
					<div className="caw-user-cname caw-item">
						<span>中文名：</span>
						<span>{detail.name}</span>
					</div>
					<div className="caw-user-ename caw-item">
						<span>英文名：</span>
						<span>{detail.name_en}</span>
					</div>
					<div className="caw-user-ename caw-item">
						<span>性别：</span>
						<span>{detail.gender}</span>
					</div>
					<div className="caw-user-ename caw-item">
						<span>生日：</span>
						<span>{detail.birthday}</span>
					</div>
					<div className="caw-user-ename caw-item">
						<span>星座：</span>
						<span>{detail.constellation}</span>
					</div>
					<div className="caw-user-ename caw-item">
						<span>出生地：</span>
						<span>{detail.born_place}</span>
					</div>
					<div className="caw-item">
						<span>职业：</span>
						{
							detail.professions && detail.professions.length > 0 && detail.professions.map((professions, index) => {
								return professions && (
									<span key={index}>{professions}</span>
								);
							})
						}
					</div>
					<div className="caw-user-attention"></div>
					<div className="caw-user-attbtn"></div>
					<div className="caw-collection-btn caw-item">
						<i className="iconfont icon-collect caw-collect-icon"></i>
						<span className="caw-collect-text">收藏影人</span>
					</div>
				</div>
			</div>
		);
	}

	masterpieceRender = (works = []) => {
		return (
			<div className="celebrity-works">
				<h3 className="celebrity-works-title">代表作品</h3>
				<ul className="celebrity-works-list">
					{
						works.length > 0 && works.map((works, worksIndex) => {
							return (
								<li className="celebrity-item" key={ worksIndex } onClick={ () => this.toDetailPage(works.subject.id) }>
									<img src={ works.subject.images.small } className="celebrity-item-img" alt=""/>
									<h2 className="celebrity-item-title">{ works.subject.title }</h2>
									<Star size={24}
                        score={ works.subject.rating.average }
                        showScore={true}
                        needNullStar={ works.subject.rating.average ? true : false } />
								</li>
							);
						})
					}
				</ul>
				<div className="all-rating">
          <span className="all-rating-text" onClick={ () => this.toWorksPaeg() }>查看全部作品</span>
          <i className="iconfont icon-keyboard_arrow_right all-rating-right"></i>
        </div>
			</div>
		);
	}

	toWorksPaeg = () => {
		this.props.history.push(`/celebrity/${ this.state.detailId }/works`)
  }
  
  toDetailPage = (id) => {
    this.props.history.push(`/movie/${ id }`)
  }

	render() {
		const { celebrity } = this.state;
		return (
			<div className="all-celebrity">
				<Header
					titleText={celebrity.name}
					{ ...this.props } />
				{this.avatarIntroRender(celebrity)}
				<div className="celebrity-user-info">
					<h3 className="user-info-title">个人简介</h3>
					<p className="celebrity-summary">{ celebrity.summary }</p>
				</div>
				{this.masterpieceRender(celebrity.works || [])}
			</div>
		);
	}
}

export default Celebrity;