import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import { Modal, Header, Actions } from 'semantic-ui-react'
import {connect} from 'react-redux';
import {fetchTodos} from '../redux/modules/todo/actions'
import Todo from './Todo'
import CreateTodo from './CreateTodo'
import url from '../images/React-icon.svg'

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      // todos: [],
      // isFetching: false
    }
    // this.fetchTodos = this.fetchTodos.bind(this);
  }

  componentWillMount() {
    this.props.fetchTodos();
  }

  // fetchTodos() {
  //   this.props.fetchTodos();
  // }

  render() {
    return (
      <div>
        <div className="ui inverted segment" style={{borderRadius: '0px'}}>
          <h1 className="ui grey inverted center aligned header">
            <img className="ui large centered image" src={url} />
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
        <div className="ui centered container three column grid">
          {this.props.todo.todos.length ?
              this.props.todo.todos.map(todo => {
                return (
                  <Todo key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    project={todo.project}
                    done={todo.done}
                    createdAt={todo.createdAt}
                  />
                )
              })
              :
              <div className="Column" style={{fontSize: 'xx-large'}}>No Todos</div>
          }
        </div>
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