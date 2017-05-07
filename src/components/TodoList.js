import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {connect} from 'react-redux';
import {fetchTodos} from '../redux/modules/todo/actions'
import Todo from './Todo'
import CreateTodo from './CreateTodo'

export class TodoList extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.fetchTodos();
  }

  render() {
    return (
      <div>
        <div className="ui inverted segment" style={{borderRadius: '0px'}}>
          <h1 className="ui grey inverted center aligned header">
            <img className="ui large centered image" src='../images/React-icon.svg' />
            <div className="content">React Testing</div>
          </h1>
        </div>
        {this.props.todo.requesting &&
          <div className="ui centered container one column grid" style={{marginTop: '30px', marginBottom: '20px'}}>
            <div className="column">
              <div className="ui active loader big"></div>
            </div>
          </div>
        }
        <div className="ui centered container one column grid">
          <CreateTodo />
        </div>
        { !this.props.todo.requesting ?
          <div className="ui centered container three column grid">
            {this.props.todo.todos.length ?
                this.props.todo.todos.map(todo => {
                  return (
                    <Todo key={todo.id}
                      id={todo.id}
                      title={todo.title}
                      project={todo.project}
                      done={todo.done}
                      url={todo.image}
                      createdAt={todo.createdAt}
                    />
                  )
                })
                :
                <div className="Column" style={{fontSize: 'xx-large'}}>No Todos</div>
            }
          </div> :
          null
        }
      </div>
    )
  }
}


TodoList.propTypes = {
  todo: PropTypes.object.isRequired,
  fetchTodos: PropTypes.func.isRequired
};

export default connect(
  state => ({
    todo: state.todo
  }),
  {fetchTodos}
)(TodoList);