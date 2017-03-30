import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../src/redux/modules/todo/actions'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const host = 'https://localhost:8000';
const fetchTodosData = [
  {
    "id": "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8",
    "title": "Todo",
    "project": "Project",
    "done": false,
    "image": "https://raw.githubusercontent.com/andela-jkithome/image_files/master/images/image5.jpg",
    "createdAt": "2017-03-02T23:04:38.003Z",
    "modifiedAt": "2017-03-22T16:44:29.034Z"
  },
  {
    "id": "a9e01001-3750-4c88-9c67-ba3e68255317",
    "title": "New Todo",
    "project": "New Project",
    "done": true,
    "image": "https://raw.githubusercontent.com/andela-jkithome/image_files/master/images/image3.jpg",
    "createdAt": "2017-03-18T06:45:57.337Z",
    "modifiedAt": "2017-03-18T17:15:23.996Z"
  }
];

const createData = {
  "id": "a9e01001-3750-4c88-9c67-ba3e68255317",
  "title": "Example",
  "project": "Testing",
  "done": false,
  "image": "https://raw.githubusercontent.com/andela-jkithome/image_files/master/images/image3.jpg",
  "createdAt": "2017-03-18T06:45:57.337Z",
  "modifiedAt": "2017-03-18T06:45:57.337Z"
}

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates TODO_SUCCESS when fetching todos has been done', () => {
    nock(host)
      .get('/api/todos')
      .reply(200, fetchTodosData)

    const expectedActions = [
      { type: 'TODO_REQUEST' },
      { type: 'TODO_SUCCESS', todos: fetchTodosData }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchTodos(host))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates TODO_FAILURE when fetching todos returns an error', () => {
    nock(host)
      .get('/api/todos')
      .reply(500, { message: 'Error creating Todo' })

    const expectedActions = [
      { type: 'TODO_REQUEST' },
      { type: 'TODO_FAILURE', failure: 'Error Fetching Todos!' }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchTodos(host))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates CREATE_SUCCESS when creating a todo was successful', () => {
    nock(host)
      .post('/api/todos', '{"title":"Example","project":"Testing"}')
      .reply(200, createData)

    const expectedActions = [
      { type: 'CREATE_REQUEST' },
      { type: 'CREATE_SUCCESS', todo: createData }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.createTodo({title:'Example',project:'Testing'}, host))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates CREATE_FAILURE when creating a todo returns an error', () => {
    nock(host)
      .post('/api/todos', '{"title":"Example","project":"Testing"}')
      .reply(500, { message: 'Error creating Todo' })

    const expectedActions = [
      { type: 'CREATE_REQUEST' },
      { type: 'CREATE_FAILURE', failure: 'Error Creating Todo!' }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.createTodo({title:'Example',project:'Testing'}, host))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})