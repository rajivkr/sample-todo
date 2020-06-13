import React, { Component } from 'react';
import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiPlusCircle } from 'react-icons/fi';

class TodoListItem extends Component {
  state = {
    todoTitle: '',
    todoEdit: false,
  };

  onInputChange = event => {
    this.setState({
      todoTitle: event.target.value,
    });
  };

  onTodoEdit = () => {
    this.setState({
      todoTitle: '',
      todoEdit: true,
    });
  };

  onInputSubmit = (event, title, todoId) => {
    event.preventDefault();
    this.props.editTodo(title, todoId);
    this.setState({
      todoEdit: false,
    });
  };

  render() {
    const { todoObj, defaultTodo, completedTodo, deleteTodo } = this.props;
    return (
      <div
        className={`item-container ${completedTodo ? 'item-completed' : ''} ${
          defaultTodo ? 'default-container' : ''
        }`}
        onClick={() => {
          if (defaultTodo) {
            this.props.addTodo();
          }
        }}
      >
        {!defaultTodo && (!todoObj.title || this.state.todoEdit) ? (
          <div className='item-title'>
            <form
              onSubmit={e =>
                this.onInputSubmit(e, this.state.todoTitle, todoObj.id)
              }
            >
              <input
                type='text'
                name='todo-input'
                placeholder='Enter Todo'
                onChange={e => this.onInputChange(e)}
              />
            </form>
          </div>
        ) : (
          <div className='item-title'>
            {defaultTodo && (
              <div className='item-add-icon'>
                {' '}
                <FiPlusCircle />
              </div>
            )}
            {todoObj.title}
          </div>
        )}
        {!defaultTodo && (
          <div className='item-functions'>
            <div className='item-edit' onClick={() => this.onTodoEdit()}>
              <GrEdit />
            </div>
            <div className='item-delete' onClick={() => deleteTodo(todoObj.id)}>
              <RiDeleteBin6Line />
            </div>
          </div>
        )}
      </div>
    );
  }
}

class TodoContainer extends Component {
  state = {
    todos: [
      {
        id: 23,
        title: 'Writing code',
        status: 2,
      },
      {
        id: 25,
        title: 'Finished CSS',
        status: 3,
      },
    ],
    todoId: 30,
  };

  addTodo = () => {
    const listOfTodos = [...this.state.todos];
    listOfTodos.push({
      title: undefined,
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

  editTodo = (title, todoId) => {
    const listOfTodos = [...this.state.todos];
    listOfTodos.forEach(todoObj => {
      if (todoObj.id === todoId) {
        todoObj.title = title;
      }
    });
    this.setState({
      todos: listOfTodos,
    });
  };

  deleteTodo = todoId => {
    let listOfTodos = [...this.state.todos];
    listOfTodos = listOfTodos.filter(todoObj => todoObj.id !== todoId);
    this.setState({
      todos: listOfTodos,
    });
  };

  render() {
    const { defaultContainer } = this.props;
    const defaultTodoObj = {
      title: 'Add a new Task',
    };

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
          {defaultContainer && (
            <TodoListItem
              defaultTodo
              todoObj={defaultTodoObj}
              addTodo={this.addTodo}
              editTodo={this.editTodo}
            />
          )}
          {todoArray.map(todoObj => {
            return (
              <TodoListItem
                key={todoObj.id}
                todoObj={todoObj}
                addTodo={this.addTodo}
                editTodo={this.editTodo}
                deleteTodo={this.deleteTodo}
              />
            );
          })}
        </div>

        <div className='doing-container'>
          {doingArray.map(todoObj => {
            return (
              <TodoListItem
                key={todoObj.id}
                todoObj={todoObj}
                editTodo={this.editTodo}
                deleteTodo={this.deleteTodo}
              />
            );
          })}
        </div>
        <div className='done-container'>
          {doneArray.map(todoObj => {
            return (
              <TodoListItem
                key={todoObj.id}
                todoObj={todoObj}
                editTodo={this.editTodo}
                completedTodo={true}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default TodoContainer;
