import React, { Component } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import Avatar from '../../assets/images/avatar.jpg';
import '../../assets/style/userInfo/index.scss';
import NavBar from '../../components/navBarBottom';

class Info extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  TabExample = () => {
    const tabs = [
      { title: '想看' },
      { title: '看过' },
      { title: '影人' },
    ];
    return (
      <div>
        <WhiteSpace />
          <Tabs 
            tabs={tabs}
            initialPage={0}
            tabBarUnderlineStyle={{ borderColor: '#42bd56' }}
            tabBarActiveTextColor="#42bd56"
            tabBarInactiveTextColor="#666"
            initalPage={'t2'}
          >
            {
              tabs.map((item, index) => {
                return (
                  <div key={ index }>
                    <div style={{ width: '100px', height: '40px', textAlign: 'center', lineHeight: '40px', backgroundColor: 'green' }}>{ item.title }</div>
                  </div>
                );
              })
            }
          </Tabs>
        <WhiteSpace />
        {/* <NavBar /> */}
      </div>
    );
  }

  topAvatar = () => {
    return (
      <div className="user">
        <div className="avatar">
          <img src={ Avatar } alt="avatar" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
        </div> 
        <div className="name">豆瓣用户</div>
      </div>
    );
  }

  render() {
    return(
      <div className="info">
        { this.topAvatar() }
        { this.TabExample() }
      </div>
    )
  }
}

export default Info;