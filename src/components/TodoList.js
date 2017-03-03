// import React, { Component } from 'react';

class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {
          "id": "b7bb6cfa-6e1b-4895-8198-4d5e080e5c0e",
          "title": "TodoX",
          "project": "ProjectX",
          "done": true,
          "createdAt": "2017-03-02T12:26:54.584Z",
          "modifiedAt": "2017-03-02T12:50:16.717Z"
        },
        {
          "id": "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8",
          "title": "Todo1",
          "project": "Project",
          "done": true,
          "createdAt": "2017-03-02T23:04:38.003Z",
          "modifiedAt": "2017-03-02T23:05:30.133Z"
        }
      ]
    }
  }

  render() {
    return (
      <div id="app">
        <h1 className="ui dividing centered header">React Testing Todo App</h1>
        <div className='ui three column centered grid'>
          <div className='column'>
            <p className="tasks">Completed Tasks: {this.state.todos.filter(todo => {return todo.done === true}).length}</p>
            <p className="tasks">Pending Tasks: {this.state.todos.filter(todo => {return todo.done === false}).length}</p>
            {this.state.todos.map( todo => {
              return <Todo key={todo.id} todo={todo} />
            })}
          </div>
        </div>
      </div>
    )
  }
}

class Todo extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: false
    }
    this.completeTodo = this.completeTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  completeTodo() {

  }

  deleteTodo() {

  }

  toggleForm() {

  }

  render() {
    return (
      <div className='ui centered card'>
        {this.state.isEditing
          ?
          <div className="content">
            <div className='ui form'>
              <div className='field'>
                <label>Title</label>
                <input type='text'/>
              </div>
              <div className='field'>
                <label>Project</label>
                <input type='text'/>
              </div>
              <div className='ui two button attached buttons'>
                <button className='ui basic blue button' onClick={this.toggleForm}>
                  Close X
                </button>
              </div>
            </div>
          </div>
          :
          <div className="content">
            <div className='header'>
                {this.props.todo.title }
            </div>
            <div className='meta'>
                { this.props.todo.project }
            </div>
            <div className='extra content'>
                <span className='right floated edit icon' onClick={this.toggleForm}>
                <i className='edit icon'></i>
              </span>
              <span className='right floated trash icon' onClick={this.deleteTodo}>
                <i className='trash icon'></i>
              </span>
            </div>
          </div>
        }
        {(!this.state.isEditing && this.props.todo.done) &&
          <div className='ui bottom attached green basic button' disabled>
            Completed
          </div>
        }
        {(!this.state.isEditing && !this.props.todo.done) &&
          <div className='ui bottom attached red basic button' onClick={this.completeTodo}>
              Pending
          </div>
        }
      </div>
    )
  }
}

ReactDOM.render(<TodoList />, document.getElementById('content'));

// export default TodoList