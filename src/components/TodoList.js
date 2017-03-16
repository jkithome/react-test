import React, { Component } from 'react'
import moment from 'moment'
import { Modal, Header, Actions } from 'semantic-ui-react'
import ReactDOM from 'react-dom'

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
      editedTodo: {},
      createModalOpen: false,
      editModalOpen: false,
      openModal: null,
    }
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleCreateOpen = this.handleCreateOpen.bind(this);
    this.handleCreateClose = this.handleCreateClose.bind(this);
    this.handleEditOpen = this.handleEditOpen.bind(this);
    this.handleEditClose = this.handleEditClose.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleFieldEdit = this.handleFieldEdit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  handleCreateOpen() {
    this.setState({createModalOpen: true});
  }

  handleCreateClose() {
    this.setState({createModalOpen: false});
  }

  handleEditOpen(id) {
    this.setState({editModalOpen: true});
    this.setState({openModal: id})
  }

  handleEditClose() {
    this.setState({editModalOpen: false});
    this.setState({openModal: null});
    this.setState({editedTodo: {}});
  }

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
    this.handleCreateClose();
  }

  handleFieldEdit(e) {
    var field = e.target.name;
    var value = e.target.value;
    var _todo = this.state.editedTodo;
    var todo = Object.assign({}, _todo, {[field]: value});
    this.setState({editedTodo: todo});
  }

  handleEdit(id) {
    var editedTodo = this.state.editedTodo
    var todos = this.state.todos;
    var newTodos = todos.map(todo => {
      if (todo.id === id) {
        return Object.assign({}, todo, editedTodo)
      } else {
        return todo;
      }
    });
    this.setState({editedTodo: {}});
    this.setState({todos: newTodos});
    this.handleEditClose();
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
                <div className="ui icon button" data-tooltip="Create New Todo" data-position="bottom center" onClick={this.handleCreateOpen}>
                  <i className="add icon"></i>
                </div>
              }
              open={this.state.createModalOpen}
              onClose={this.handleCreateClose}
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
                <button className='ui inverted red button' onClick={this.handleCreateClose}>
                  <i className='remove icon'></i> Cancel
                </button>
              </Modal.Actions>
            </Modal>
          </div>
        </div>
        <div className="ui centered container three column grid">
          {this.state.todos.map(todo => {
            return (
              <div className="column" key={todo.id}>
                <div className="ui brown card">
                  <img className="ui image" src={'../src/images/image' + Math.ceil(Math.random() * 10) + '.jpg'} />
                  <div className="content">
                    <div className="header">{todo.title}</div>
                    <div className="meta">{todo.project}</div>
                    <div className="meta">Created {moment(todo.createdAt).fromNow()}</div>
                  </div>
                  <div className="extra content">
                    <div>
                      <div className="ui toggle checkbox" style={{marginBottom: '10px'}}>
                        <input type="checkbox" name="public" value="on" defaultChecked ={todo.done} onChange={this.handleToggle.bind(null, todo.id)}/>
                        <label>Complete</label>
                      </div>
                      <div className="ui two buttons">
                        <Modal
                          trigger={<button className='ui basic green button' onClick={this.handleEditOpen.bind(null, todo.id)}>Edit</button>}
                          open={this.state.editModalOpen && this.state.openModal === todo.id}
                          onClose={this.handleEditClose}
                        >
                          <Modal.Header>Edit Todo</Modal.Header>
                          <Modal.Content>
                            <div className='ui form'>
                              <div className='field'>
                                <label>Title</label>
                                <input type='text'
                                  name="title"
                                  defaultValue={todo.title}
                                  onChange={this.handleFieldEdit}
                                />
                              </div>
                              <div className='field'>
                                <label>Project</label>
                                <input type='text'
                                  name="project"
                                  defaultValue={todo.title}
                                  onChange={this.handleFieldEdit}
                                />
                              </div>
                            </div>
                          </Modal.Content>
                          <Modal.Actions>
                            <button className='ui inverted green button' onClick={this.handleEdit.bind(null, todo.id)}>
                              <i className='checkmark icon'></i> Update
                            </button>
                            <button className='ui inverted red button' onClick={this.handleEditClose}>
                              <i className='remove icon'></i> Cancel
                            </button>
                          </Modal.Actions>
                        </Modal>
                        <button className="ui red basic button" onClick={this.handleDelete.bind(null, todo.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}


ReactDOM.render(<TodoList />, document.getElementById('content'));