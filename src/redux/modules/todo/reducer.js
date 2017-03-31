const updateTodos = (todos, todo) => todos.map(t => t.id === todo.id ? todo : t)
const removeTodo = (todos, id) => todos.filter(t => t.id !== id)

export default function reducer(state = {
  requesting: false,
  todos: [],
  error: null,

}, action) {
  switch (action.type) {
    case 'TODO_REQUEST':
      return Object.assign({}, state,
        {
          requesting: true,
          error: null,
        }
      );
    case 'TODO_SUCCESS':
      return Object.assign({}, state,
        {
          requesting: false,
          todos: action.todos
        }
      );
    case 'TODO_FAILURE':
    case 'CREATE_FAILURE':
    case 'EDIT_FAILURE':
    case 'TOGGLE_FAILURE':
    case 'DELETE_FAILURE':
      return Object.assign({}, state,
        {
          requesting: false,
          error: action.failure
        }
      );
    case 'CREATE_REQUEST':
      return Object.assign({}, state,
        {
          requesting: true,
          error: null,
        }
      );
    case 'CREATE_SUCCESS':
      return Object.assign({}, state,
        {
          requesting: false,
          todos: [action.todo, ...state.todos]
          // todos: true // Write code for this
        }
      );

    case 'EDIT_REQUEST':
      return Object.assign({}, state,
        {
          requesting: true,
          error: null,
        }
      );
    case 'EDIT_SUCCESS':
    case 'TOGGLE_SUCCESS':
      return Object.assign({}, state,
        {
          requesting: false,
          todos: updateTodos(state.todos, action.todo)
        }
      );
    case 'TOGGLE_REQUEST':
      return Object.assign({}, state,
        {
          requesting: true,
          error: null
        }
      );
    case 'DELETE_REQUEST':
      return Object.assign({}, state,
        {
          requesting: true,
          error: null
        }
      );
    case 'DELETE_SUCCESS':
      return Object.assign({}, state,
        {
          requesting: false,
          todos: removeTodo(state.todos, action.id)
        }
      );
    default:
      return state;
  }
}
