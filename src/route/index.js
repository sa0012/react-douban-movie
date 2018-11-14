import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import NavBar from '../components/navBarBottom'

const AsyncLoadable = opts => {
  return Loadable({
    loading: () => null, //ShowLoadingComponent,
    delay: 200,
    timeout: 1000,
    loader: opts.loader
    // ...opts
  })
}

export default class RouteConfig extends Component {
  render() {
    return (
      <Route
        render={({ location }) => {
          const { pathname, search } = location
          return (
            <div id="App" style={{ width: '100%', height: '100%' }}>
              <Switch>
                <Route path="/" exact component={
                  AsyncLoadable({
                    loader: () => import('../pages/hot')
                  })
                } />
                <Route exact path="/ranking" component={
                  AsyncLoadable({
                    loader: () => import('../pages/ranking')
                  })
                } />
                <Route exact path="/mine" component={
                  AsyncLoadable({
                    loader: () => import('../pages/mine')
                  })
                } />
                <Route exact path="/ranking/top250" component={
                  AsyncLoadable({
                    loader: () => import('../pages/ranking/top250')
                  })
                } />
                <Route exact path="/ranking/weekly" component={
                  AsyncLoadable({
                    loader: () => import('../pages/ranking/weekly')
                  })
                } />
                <Route exact path="/ranking/newMovies" component={
                  AsyncLoadable({
                    loader: () => import('../pages/ranking/newMovies')
                  })
                } />
                <Route exact path="/ranking/usBox" component={
                  AsyncLoadable({
                    loader: () => import('../pages/ranking/usBox')
                  })
                } />
                <Route exact path="/movie/:id" component={
                  AsyncLoadable({
                    loader: () => import('../pages/detail')
                  })
                } />
                <Route exact path="/search" component={
                  AsyncLoadable({
                    loader: () => import('../pages/search')
                  })
                } />
                <Route exact path="/tag/:tag" component={
                  AsyncLoadable({
                    loader: () => import('../pages/tagList')
                  })
                } />
                <Redirect to="/" />
              </Switch>
              {
                (pathname === '/' || pathname === '/ranking' || pathname === '/mine') && (<NavBar />)
              }
            </div>
          );
        }} />
    )
  }
}