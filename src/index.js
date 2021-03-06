import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import './assets/style/reset.scss';
import 'antd-mobile/dist/antd-mobile.css';
import './assets/style/iconfont.scss';
import FastClick from 'fastclick';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store/store';
import Route from './route';
import { createBrowserHistory } from "history";
import { Router, HashRouter } from 'react-router-dom';

// import axios from 'axios';

// axios.get('https://api.douban.com/v2/movie/in_theaters', {
//   apikey: '0b2bdeda43b5688921839c8ecb20399b',
//   start: 0,
//   count: 10
// })

const history = createBrowserHistory();

//Router 发布模式刷新会找不到页面，需配置服务端
const ModeRouter = Object.is(process.env.NODE_ENV, 'development')
  ? Router
  : HashRouter

FastClick.attach(document.body);

ReactDOM.render(
  <ModeRouter history={history} >
    <Provider store={store}>
      <Route />
    </Provider>
  </ModeRouter>, document.getElementById('root'));
registerServiceWorker();
