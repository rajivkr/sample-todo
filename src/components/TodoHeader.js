import React, { Component } from 'react';

class TodoHeader extends Component {
  render() {
    return (
      <div className="todo-headers-list">
        <div className="todo-headers-list-item">to do</div>
        <div className="todo-headers-list-item">doing</div>
        <div className="todo-headers-list-item">done</div>
      </div>
    );
  }
}

export default TodoHeader;
