import React, { Component } from 'react'
import moment from 'moment'
import { Modal, Header, Actions } from 'semantic-ui-react'
import ReactDOM from 'react-dom'
import Todo from './Todo'

class TodoList extends Component {
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
          "done": false,
          "createdAt": "2017-03-02T23:04:38.003Z",
          "modifiedAt": "2017-03-02T23:05:30.133Z"
        },
        {
          "id": "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c7",
          "title": "Todo5",
          "project": "Project5",
          "done": true,
          "createdAt": "2017-03-02T23:04:38.003Z",
          "modifiedAt": "2017-03-02T23:05:30.133Z"
        },
        {
          "id": "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c6",
          "title": "Todo6",
          "project": "Project6",
          "done": true,
          "createdAt": "2017-03-02T23:04:38.003Z",
          "modifiedAt": "2017-03-02T23:05:30.133Z"
        }
      ],
      todo: {
        title: '',
        project: ''
      },
      modalOpen: false,
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    {/*this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);*/}
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    {/*this.handleFieldEdit = this.handleFieldEdit.bind(this);*/}
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  handleOpen() {
    this.setState({modalOpen: true});
  }

  handleClose() {
    this.setState({modalOpen: false});
  }

  // handleEditOpen(id) {
  //   this.setState({editModalOpen: true});
  //   this.setState({openModal: id})
  // }

  // handleEditClose() {
  //   this.setState({editModalOpen: false});
  //   this.setState({openModal: null});
  //   this.setState({editedTodo: {}});
  // }}

  handleFieldChange(e) {
    var field = e.target.name;
    var value = e.target.value;
    var _todo = this.state.todo;
    var todo = Object.assign({}, _todo, {[field]: value});
    this.setState({todo: todo});
  }

  handleCreate() {
    var todo = this.state.todo;
    todo = Object.assign({}, todo, {done: false, createdAt: new Date(), modifiedAt: new Date(), id: Math.floor(Math.random() * 10000000)});
    var todos = this.state.todos;
    todos.push(todo);
    this.setState({todos: todos})
    this.handleClose();
  }

  // handleFieldEdit(e) {
  //   var field = e.target.name;
  //   var value = e.target.value;
  //   var _todo = this.state.editedTodo;
  //   var todo = Object.assign({}, _todo, {[field]: value});
  //   this.setState({editedTodo: todo});
  // }

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
            <img className="ui large centered image" src="../src/images/React-icon.svg" />
            <div className="content">React Testing</div>
          </h1>
        </div>
        <div className="ui centered container one column grid">
          <div className="column" style={{textAlign: 'center'}}>
            <Modal
              trigger={
                <div className="ui icon button" data-tooltip="Create New Todo" data-position="bottom center" onClick={this.handleOpen}>
                  <i className="add icon"></i>
                </div>
              }
              open={this.state.modalOpen}
              onClose={this.handleClose}
            >
              <Modal.Header>Create Todo</Modal.Header>
              <Modal.Content>
                <div className='ui form'>
                  <div className='field'>
                    <label>Title</label >
                    <input type='text' name="title" onChange={this.handleFieldChange} />
                  </div>
                  <div className='field'>
                    <label>Project</label>
                    <input type='text' name="project" onChange={this.handleFieldChange} />
                  </div>
                </div>
              </Modal.Content>
              <Modal.Actions>
                <button className='ui inverted green button' onClick={this.handleCreate}>
                  <i className='checkmark icon'></i> Create
                </button>
                <button className='ui inverted red button' onClick={this.handleClose}>
                  <i className='remove icon'></i> Cancel
                </button>
              </Modal.Actions>
            </Modal>
          </div>
        </div>
        <div className="ui centered container three column grid">
          {this.state.todos.map(todo => {
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
          })}
        </div>
      </div>
    )
  }
}


ReactDOM.render(<TodoList />, document.getElementById('content'));