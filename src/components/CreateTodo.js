import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
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
      formOpen: false
    }

    this.handleOpen=this.handleOpen.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleFieldChange=this.handleFieldChange.bind(this);
    this.handleCreate=this.handleCreate.bind(this);
  }

  handleOpen() {
    this.setState({formOpen: true});
  }

  handleClose() {
    this.setState({todo: {title: null, project: null}});
    this.setState({formOpen: false});
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
        {this.state.formOpen ?
          <div className="ui centered grid">
            <div className="eight wide column" style={{boxShadow: '0 0 0 1px #d4d4d5, 0 2px 0 0 #a5673f, 0 1px 3px 0 #d4d4d5', margin: '20px 0', padding: 0}}>
              <div className="header" style={{display: 'block',
    fontFamily: 'Lato,"Helvetica Neue",Arial,Helvetica,sans-serif',
    background: '#fff',
    margin: 0,
    padding: '1.25rem 1.5rem',
    boxShadow: 'none',
    color: 'rgba(0,0,0,.85)',
    borderBottom: '1px solid rgba(34,36,38,.15)',fontSize: '1.42857143rem',
    lineHeight: '1.28571429em',
    fontWeight: 700}}>Create Todo</div>
              <div className="content" style={{display: 'block',
    width: '100%',
    fontSize: '1em',
    lineHeight: 1.4,
    padding: '1.5rem',
    background: '#fff'}}>
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
              </div>
              <div className="actions" style={{background: '#f9fafb',
    padding: '1rem 1rem',
    borderTop: '1px solid rgba(34,36,38,.15)',
    textAlign: 'right'}}>
                <button className='ui inverted green button' onClick={this.handleCreate}>
                  <i className='checkmark icon'></i> Create
                </button>
                <button className='ui inverted red button' onClick={this.handleClose}>
                  <i className='remove icon'></i> Cancel
                </button>
              </div>
            </div>
          </div>
         :
          <div className="ui icon button" data-tooltip="Create New Todo" data-position="bottom center" onClick={this.handleOpen}>
            <i className="add icon"></i>
          </div>
        }
      </div>
    )
  }
}

CreateTodo.propTypes = {
  createTodo: PropTypes.func.isRequired,
};

export default connect(null, {createTodo})(CreateTodo);
