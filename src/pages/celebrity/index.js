import React, { Component } from 'react';
import { getCelebrity, getCelebrityWorks } from '../../store/actions/celebrity';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from '../../util';
import Header from '../../components/Header';
import Star from '../../components/star';
import '../../assets/style/celebrity/index.scss';

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
					<div className="caw-user-cname">{detail.name}</div>
					<div className="caw-user-ename">{detail.name_en}</div>
					<div className="caw-user-ename">{detail.born_place}</div>
					<div className="caw-user-ename">{detail.constellation}</div>
					<div className="caw-user-ename">{detail.birthday}</div>
					<div className="caw-user-ename">{detail.gender}</div>
					<div>
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
								<li className="celebrity-item" key={ worksIndex }>
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