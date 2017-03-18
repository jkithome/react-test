import React, { Component } from 'react'
import moment from 'moment'
import { Modal, Header, Actions } from 'semantic-ui-react'
import ReactDOM from 'react-dom'
import Todo from './Todo'
import CreateTodo from './CreateTodo'
import url from '../images/React-icon.svg'
// const todos =
// [{
//   "id": "b7bb6cfa-6e1b-4895-8198-4d5e080e5c0e",
//   "title": "TodoX",
//   "project": "ProjectX",
//   "done": true,
//   "createdAt": "2017-03-02T12:26:54.584Z",
//   "modifiedAt": "2017-03-02T12:50:16.717Z"
// },
// {
//   "id": "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8",
//   "title": "Todo1",
//   "project": "Project",
//   "done": false,
//   "createdAt": "2017-03-02T23:04:38.003Z",
//   "modifiedAt": "2017-03-02T23:05:30.133Z"
// },
// {
//   "id": "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c7",
//   "title": "Todo5",
//   "project": "Project5",
//   "done": true,
//   "createdAt": "2017-03-02T23:04:38.003Z",
//   "modifiedAt": "2017-03-02T23:05:30.133Z"
// },
// {
//   "id": "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c6",
//   "title": "Todo6",
//   "project": "Project6",
//   "done": true,
//   "createdAt": "2017-03-02T23:04:38.003Z",
//   "modifiedAt": "2017-03-02T23:05:30.133Z"
// }]

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      isFetching: false
    }
    this.handleCreate = this.handleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
  }

  componentWillMount() {
    this.fetchTodos()
  }

  fetchTodos() {
    this.setState({isFetching: true});
    fetch('/api/todos', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
    }).then(response => {
      if (!response.ok) {
        return response.json().then(Promise.reject.bind(Promise));
      }
      return response.json();
    }).then(json => {
      this.setState({todos: json})
      this.setState({isFetching: false});
    }).catch(err => {
      console.log('There was an error', err);
      this.setState({isFetching: false});
    });
  }


  handleCreate(todo) {
    var newTodo = Object.assign({}, todo, {done: false, createdAt: new Date(), modifiedAt: new Date(), id: (Math.floor(Math.random() * 10000000)).toString()});
    var todos = this.state.todos;
    todos.push(newTodo);
    this.setState({todos: todos})
  }

  handleEdit(id, _todo) {
    var todos = this.state.todos;
    var newTodos = todos.map(todo => {
      if (todo.id === id) {
        return Object.assign({}, todo, _todo)
      } else {
        return todo;
      }
    });
    this.setState({todos: newTodos});
  }

  handleDelete(id) {
    var todos = this.state.todos;
    var newTodos = todos.filter(todo => {
      return todo.id !== id;
    });
    this.setState({todos: newTodos});
  }

  handleToggle(id) {
    var todos = this.state.todos;
    var newTodos = todos.map(todo => {
      if (todo.id === id) {
        return Object.assign({}, todo, {done: !todo.done})
      } else {
        return todo;
      }
    });
    this.setState({todos: newTodos});
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <div className="ui inverted segment" style={{borderRadius: '0px'}}>
          <h1 className="ui grey inverted center aligned header">
            <img className="ui large centered image" src={url} />
            <div className="content">React Testing</div>
          </h1>
        </div>
        <div className="ui centered container one column grid">
          <CreateTodo
            handleCreate={this.handleCreate}
          />
        </div>
        <div className="ui centered container three column grid">
          {this.state.isFetching ?
            <div className="ui segment">
              <div className="ui active dimmer">
                <div className="ui massive text loader">Fetching Todos</div>
              </div>
            </div>
            : (this.state.todos.length ?
              this.state.todos.map(todo => {
                return (
                  <Todo key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    project={todo.project}
                    done={todo.done}
                    createdAt={todo.createdAt}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    handleToggle={this.handleToggle}
                  />
                )
              })
              :
              <div className="Column" style={{fontSize: 'xx-large'}}>No Todos</div>)
          }
        </div>
      </div>
    )
  }
}


ReactDOM.render(<TodoList />, document.getElementById('content'));