import React, { Component } from 'react';
import { GrEdit } from 'react-icons/gr';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiPlusCircle } from 'react-icons/fi';
import Draggable from '../dragNdrop/Draggable';
import Droppable from '../dragNdrop/Droppable';

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

  onTodoEdit = title => {
    this.setState({
      todoTitle: title,
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
                autoFocus
                value={this.state.todoTitle}
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
            <div
              className='item-edit'
              onClick={() => this.onTodoEdit(todoObj.title)}
            >
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
        title: 'Get News paper',
        status: 2,
      },
      {
        id: 25,
        title: 'Buy Milk',
        status: 3,
      },
    ],
    todoId: 30,
    elemDragged: undefined,
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

  onDrop = (draggedTodoObj, status) => {
    if (draggedTodoObj.status === status) {
      return;
    }
    const listOfTodos = [...this.state.todos];
    listOfTodos.forEach(todoObj => {
      if (todoObj.id === draggedTodoObj.id) {
        todoObj.status = status;
      }
    });
    this.setState({
      todos: listOfTodos,
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

  setDraggedElem = draggedObj => {
    const listOfTodos = [...this.state.todos];
    listOfTodos.forEach(todoObj => {
      if (todoObj.id === draggedObj.id) {
        todoObj.status = draggedObj.status;
      }
    });
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
          <Droppable id='dr1' onTodoDrop={this.onDrop} status={1}>
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
                <Draggable
                  todoItem={todoObj}
                  setDragElement={this.setDraggedElem}
                  key={todoObj.id}
                >
                  <TodoListItem
                    key={todoObj.id}
                    todoObj={todoObj}
                    addTodo={this.addTodo}
                    editTodo={this.editTodo}
                    deleteTodo={this.deleteTodo}
                  />
                </Draggable>
              );
            })}
          </Droppable>
        </div>

        <div className='doing-container'>
          <Droppable id='dr2' onTodoDrop={this.onDrop} status={2}>
            {doingArray.map(todoObj => {
              return (
                <Draggable
                  todoItem={todoObj}
                  key={todoObj.id}
                  setDragElement={this.setDraggedElem}
                >
                  <TodoListItem
                    key={todoObj.id}
                    todoObj={todoObj}
                    editTodo={this.editTodo}
                    deleteTodo={this.deleteTodo}
                  />
                </Draggable>
              );
            })}
          </Droppable>
        </div>

        <div className='done-container'>
          <Droppable id='dr3' onTodoDrop={this.onDrop} status={3}>
            {doneArray.map(todoObj => {
              return (
                <Draggable
                  todoItem={todoObj}
                  key={todoObj.id}
                  setDragElement={this.setDraggedElem}
                >
                  <TodoListItem
                    key={todoObj.id}
                    todoObj={todoObj}
                    editTodo={this.editTodo}
                    completedTodo={true}
                    deleteTodo={this.deleteTodo}
                  />
                </Draggable>
              );
            })}
          </Droppable>
        </div>
      </div>
    );
  }
}

export default TodoContainer;
