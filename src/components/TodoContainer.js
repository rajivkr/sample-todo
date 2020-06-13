import React, { Component } from 'react';

const DefaultTodoItem = props => {
  return (
    <div className='default-todo' onClick={() => props.clickHander()}>
      Add a new task
    </div>
  );
};

class TodoListItem extends Component {
  state = {
    todoTitle: '',
  };

  onInputChange = event => {
    this.setState({
      todoTitle: event.target.value,
    });
  };

  onInputSubmit = (event, title) => {
    event.preventDefault();
    this.props.addTodo(title);
  };

  render() {
    const { todoObj } = this.props;
    return (
      <div className='item-container'>
        {!todoObj.title ? (
          <form onSubmit={e => this.onInputSubmit(e, this.state.todoTitle)}>
            <input
              type='text'
              name='todo-input'
              className='item-title'
              onChange={e => this.onInputChange(e)}
            />
          </form>
        ) : (
          <div className='item-title'>{todoObj.title}</div>
        )}
        <div className='item-edit'>E</div>
        <div className='item-delete'>D</div>
      </div>
    );
  }
}

class TodoContainer extends Component {
  state = {
    todos: [
      {
        id: 23,
        title: 'Sample todo',
        status: 2,
      },
      {
        id: 25,
        title: 'finished',
        status: 3,
      },
    ],
    todoId: 30,
  };

  addTodo = todoTitle => {
    const listOfTodos = [...this.state.todos];
    listOfTodos.push({
      title: todoTitle ? todoTitle : undefined,
      status: 1,
      id: this.state.todoId,
    });

    this.setState(prevState => {
      return {
        todos: listOfTodos,
        todoId: ++prevState.todoId,
      };
    });
  };

  editTodo = (event, todoId) => {
    const listOfTodos = [...this.state.todos];
    listOfTodos.forEach(todoObj => {
      if (todoObj.id === todoId) {
        todoObj.title = event.target.value;
      }
    });
    this.setState({
      todos: listOfTodos,
    });
  };

  render() {
    const { defaultContainer } = this.props;

    const todoArray = [],
      doingArray = [],
      doneArray = [];

    this.state.todos.forEach(todoObj => {
      if (todoObj.status === 1) {
        todoArray.push(todoObj);
      } else if (todoObj.status === 2) {
        doingArray.push(todoObj);
      } else {
        doneArray.push(todoObj);
      }
    });

    return (
      <div className='todos-wrapper'>
        <div className='todo-container'>
          {defaultContainer && <DefaultTodoItem clickHander={this.addTodo} />}
          {todoArray.map(todoObj => {
            return (
              <TodoListItem
                key={todoObj.id}
                todoObj={todoObj}
                addTodo={this.addTodo}
              />
            );
          })}
        </div>
        <div className='doing-container'>
          {doingArray.map(todoObj => {
            return <TodoListItem key={todoObj.id} todoObj={todoObj} />;
          })}
        </div>
        <div className='done-container'>
          {doneArray.map(todoObj => {
            return <TodoListItem key={todoObj.id} todoObj={todoObj} />;
          })}
        </div>
      </div>
    );
  }
}

export default TodoContainer;
