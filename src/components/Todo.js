import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { Modal, Header, Actions } from 'semantic-ui-react'
var pathToImages = require.context('../images', true);

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      todo: {}
    }
    this.handleOpen=this.handleOpen.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleFieldChange=this.handleFieldChange.bind(this);
    this.handleEdit=this.handleEdit.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
    this.handleToggle=this.handleToggle.bind(this);
  }

  handleOpen(e) {
    this.setState({modalOpen: true});
  }

  handleClose(e) {
    this.setState({modalOpen: false});
    this.setState({todo: {}});
  }

  handleFieldChange(e) {
    var field = e.target.name;
    var value = e.target.value;
    var todo = this.state.todo;
    var todo = Object.assign({}, todo, {[field]: value});
    this.setState({todo: todo});
  }

  handleEdit(e) {
    this.props.handleEdit(this.props.id, this.state.todo);
    this.handleClose();
  }

  handleDelete(e) {
    this.props.handleDelete(this.props.id)
  }

  handleToggle(e) {
    this.props.handleToggle(this.props.id, !this.props.done)
  }

  render() {
    return (
      <div className="column">
        <div className="ui brown card">
          <img className="ui image" src={pathToImages(`./image${Math.ceil(Math.random() * 10)}.jpg`, true)} />
          <div className="content">
            <div className="header">{this.props.title}</div>
            <div className="meta">{this.props.project}</div>
            <div className="meta">Created {moment(this.props.createdAt).fromNow()}</div>
          </div>
          <div className="extra content">
            <div>
              <div className="ui toggle checkbox" style={{marginBottom: '10px'}}>
                <input type="checkbox" name="public" value="on" defaultChecked ={this.props.done} onChange={this.handleToggle}/>
                <label>Complete</label>
              </div>
              <div className="ui two buttons">
                <Modal
                  trigger={<button className='ui basic green button' onClick={this.handleOpen}>Edit</button>}
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                >
                  <Modal.Header>Edit Todo</Modal.Header>
                  <Modal.Content>
                    <div className='ui form'>
                      <div className='field'>
                        <label>Title</label>
                        <input type='text'
                          name="title"
                          defaultValue={this.props.title}
                          onChange={this.handleFieldChange}
                        />
                      </div>
                      <div className='field'>
                        <label>Project</label>
                        <input type='text'
                          name="project"
                          defaultValue={this.props.project}
                          onChange={this.handleFieldChange}
                        />
                      </div>
                    </div>
                  </Modal.Content>
                  <Modal.Actions>
                    <button className='ui inverted green button' onClick={this.handleEdit}>
                      <i className='checkmark icon'></i> Update
                    </button>
                    <button className='ui inverted red button' onClick={this.handleClose}>
                      <i className='remove icon'></i> Cancel
                    </button>
                  </Modal.Actions>
                </Modal>
                <button className="ui red basic button" onClick={this.handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Todo