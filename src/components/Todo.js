import React, { Component } from 'react';


class Todo extends Component {
  constructor() {
    supee();
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
    <div class='ui centered card'>
    {!this.state.isEditing
      ?
      <div class="content">
        <div class='header'>
            {this.props.todo.title }
        </div>
        <div class='meta'>
            { this.props.todo.project }
        </div>
        <div class='extra content'>
            <span class='right floated edit icon' onClick={this.toggleForm}>
            <i class='edit icon'></i>
          </span>
          <span class='right floated trash icon' onClick={this.deleteTodo}>
            <i class='trash icon'></i>
          </span>
        </div>
      </div>
      :
      <div class="content">
        <div class='ui form'>
          <div class='field'>
            <label>Title</label>
            <input type='text'/>
          </div>
          <div class='field'>
            <label>Project</label>
            <input type='text'/>
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' onClick={this.toggleForm}>
              Close X
            </button>
          </div>
        </div>
      </div>
    }
    {(!this.state.isEditing && todo.done) &&
      <div class='ui bottom attached green basic button' disabled>
        Completed
      </div>
    }
    {(!this.state.isEditing && !todo.done) &&
      <div class='ui bottom attached red basic button' onClick={this.completeTodo}>
          Pending
      </div>
    }
  </div>
  }
}