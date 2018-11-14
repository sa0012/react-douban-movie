import React, { Component } from 'react';
import '../assets/style/navBarBottom.scss';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOptions: [
        {
          title: '热映',
          toLink: '/',
          active: true,
          icon: 'icon-video-camera'
        },
        {
          title: '排行',
          toLink: '/ranking',
          active: false,
          icon: 'icon-stats-bars'
        },
        {
          title: '我的',
          toLink: '/mine',
          active: false,
          icon: 'icon-user'
        },
      ]
    };
  }

  componentDidMount() {
  }

  render() {
    let navArr = this.state.navOptions || [];
    return (
      <div>
        { this.props.children }
        <div className="nav-bottom">
          {
            navArr.map((item, index) => {
              return (
                <NavLink 
                  activeStyle={{ color: 'green' }} 
                  exact 
                  to={ item.toLink } 
                  className="link"
                  key={ index }
                >
                  <span className="tab-icon">
                    <i className={ classnames({
                      "iconfont": true,
                      "tab-icon": true,
                      [item.icon]: true
                    }) }></i>
                  </span>
                  <span className="tab-link">{ item.title }</span>
                </NavLink>
              );
            })
          }
        </div>
      </div>
      
    )
  }
}

export default NavBar;