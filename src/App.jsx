import React, { Component, Fragment } from 'react';
import './App.css';
import Header from './components/Header';
import TodoHeader from './components/TodoHeader';
import TodoContainer from './components/TodoContainer';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className='todo-app'>
          <TodoHeader />
          <TodoContainer defaultContainer />
        </div>
      </Fragment>
    );
  }
}

export default App;
