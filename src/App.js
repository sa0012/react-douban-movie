import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import {increment, decrement, handleInput, incrementAsync, receiveMovie, getMovie } from './store/action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Header from './components/Header'

function mapDispatchToProps(dispatch) {
  return {
    increment: bindActionCreators(increment, dispatch),
    decrement: bindActionCreators(decrement, dispatch),
    handleInput: bindActionCreators(handleInput, dispatch),
    incrementAsync: bindActionCreators(incrementAsync, dispatch),
    receiveMovie: bindActionCreators(receiveMovie, dispatch),
    getMovie: bindActionCreators(getMovie, dispatch)
  }
}

@connect(state => ({
  count: state.count,
  text: state.hello,
  char: state.char,
  movies: state.movies
}), mapDispatchToProps)

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: 'this is a change'
    }
  }

  componentDidMount() {
    const { receiveMovie } = this.props;
    receiveMovie()
  }

  handleChange = event => {
    let value = event.target.value;
    this.setState({
      name: value
    })
  }

  toPage = () => {
    this.props.history.push({ pathname: '/home', state: { orderNo: 'LSJA0000000000571' } })
  }

  renderLeftItem () {
    return (
      <div>
        left
      </div>
    )
  }

  renderTitleItem () {
    return (
      <div>
        title
      </div>
    )
  }

  renderRightItem () {
    return (
      <div>
        right
      </div>
    )
  }

  renderMovieList (movies) {
    let list = movies.subjects || []
    return list.map((item, index) => {
      return (
        <li key={index}>
          <div style={{ width: '100%', height: '30px', lineHeight: '30px', background: '#ccc', margin: '10px 0' }}>{ item.title }</div>
          <img src={ item.images.large } />
        </li>
      )
    })
  }



  render() {
    const { increment, decrement, handleInput, receiveMovie, incrementAsync, movies } = this.props;
    return (
      <div className="App">
        <Header
          leftItem={() => this.renderLeftItem()}
          titleItem={() => this.renderTitleItem()}
          rightItem={() => this.renderRightItem()}
        />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="num">{ this.props.text } --- { this.props.count }</p>
        <div className="btn increment" onClick={ () => increment(2, 'aaaaaa') }>+</div>
        <div className="btn decrement" onClick={ () => decrement(3, 'bbbbbb') }>-</div>
        <div style={{ marginTop: '20px', fontSize: '20px', width: '200px', height: '30px', lineHeight: '30px', textAlign: 'center', background: 'cyan' }} onClick={ () => incrementAsync(12) }>incrementAsync</div>

        <input type="text" ref="name" placeholder="请输入字符" onInput={ event => handleInput(event.target.value) } 
        style={{ width: '200px', height: '40px', lineHeight: '40px', textAlign: 'center', marginTop: '30px' }}/>
        <div>{ this.props.char }</div>
        <input type="text" onChange={ event => this.handleChange(event) } />
        <div style={{ marginTop: '50px' }}>{ this.state.name }</div>
        <div onClick={ () => this.toPage() }>跳转到home页</div>
        <div onClick={ () => receiveMovie() }>saga测试</div>

        <ul>
          {
            this.renderMovieList(movies)
          }
        </ul>
      </div>
    );
  }
}

// 对于props传入的值需要设置默认值， 否则会报错
App.defaultProps = {
  increment: Function,
  decrement: Function,
  handleInput: Function,
  count: 0,
  text: '',
  char: '',
  movies: {}
}
App.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  char: PropTypes.string.isRequired,
  movies: PropTypes.object
}
// const mapStateToProps = state => ({
//   count: state.count,
//   text: state.hello,
//   char: state.char
// });

// export default connect(mapStateToProps, action)(App)
export default App
