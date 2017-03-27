import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { Modal, Header, Actions } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {createTodo} from '../redux/modules/todo/actions'


export class CreateTodo extends Component {
  constructor() {
    super();
    this.state = {
      todo: {
        title: null,
        project: null
      },
      modalOpen: false
    }

    this.handleOpen=this.handleOpen.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleFieldChange=this.handleFieldChange.bind(this);
    this.handleCreate=this.handleCreate.bind(this);
  }

  handleOpen() {
    this.setState({modalOpen: true});
  }

  handleClose() {
    this.setState({todo: {title: null, project: null}});
    this.setState({modalOpen: false});
  }

  handleFieldChange(e) {
    var field = e.target.name;
    var value = e.target.value;
    var todo = this.state.todo;
    todo = Object.assign({}, todo, {[field]: value});
    this.setState({todo: todo});
  }

  handleCreate() {
    this.props.createTodo(this.state.todo);
    this.handleClose();
  }

  render() {
    return (
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
    )
  }
}

CreateTodo.propTypes = {
  createTodo: PropTypes.func.isRequired,
};

export default connect(null, {createTodo})(CreateTodo);