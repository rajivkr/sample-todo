import React, { Component, Fragment } from 'react';
import './App.css';
import { get } from 'axios';
import logger from './utils/logger';
import Header from './components/Header';
import TodoHeader from './components/TodoHeader';
import TodoContainer from './components/TodoContainer';

class App extends Component {
  componentDidMount() {
    get('http://localhost:3000/api').then((resp) => {
      logger.info(resp.data);
    });
  }

  render() {
    return (
      <Fragment>
        <Header />
        <div className="todo-app">
          <TodoHeader />
          <TodoContainer defaultContainer />
        </div>
      </Fragment>
    );
  }
}

export default App;
