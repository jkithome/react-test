import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../src/redux/modules/todo/actions'
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

const editData = {
  "id": "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8",
  "title": "New Title",
  "project": "Project",
  "done": false,
  "image": "https://raw.githubusercontent.com/andela-jkithome/image_files/master/images/image5.jpg",
  "createdAt": "2017-03-02T23:04:38.003Z",
  "modifiedAt": "2017-03-22T16:44:29.034Z"
}

const toggleData = {
  "id": "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8",
  "title": "New Title",
  "project": "Project",
  "done": true,
  "image": "https://raw.githubusercontent.com/andela-jkithome/image_files/master/images/image5.jpg",
  "createdAt": "2017-03-02T23:04:38.003Z",
  "modifiedAt": "2017-03-22T16:44:29.034Z"
}

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates TODO_SUCCESS when fetching todos has been done', () => {
    nock(host)
      .get('/api/todos')
      .reply(200, fetchTodosData)

    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchTodos(host))
      .then(() => { // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

  it('creates TODO_FAILURE when fetching todos returns an error', () => {
    nock(host)
      .get('/api/todos')
      .reply(500, { message: 'Error creating Todo' })

    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchTodos(host))
      .then(() => { // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

  it('creates CREATE_SUCCESS when creating a todo was successful', () => {
    nock(host)
      .post('/api/todos', '{"title":"Example","project":"Testing"}')
      .reply(200, createData)

    const store = mockStore({ todos: [] })

    return store.dispatch(actions.createTodo({title:'Example',project:'Testing'}, host))
      .then(() => { // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

  it('creates CREATE_FAILURE when creating a todo returns an error', () => {
    nock(host)
      .post('/api/todos', '{"title":"Example","project":"Testing"}')
      .reply(500, { message: 'Error creating Todo' })

    const store = mockStore({ todos: [] })

    return store.dispatch(actions.createTodo({title:'Example',project:'Testing'}, host))
      .then(() => { // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

  it('creates EDIT_SUCCESS when editing a todo was successful', () => {
    nock(host)
      .put('/api/todo/' + editData.id, '{"title":"New Title"}')
      .reply(200, editData)

    const store = mockStore({ todos: [] })

    return store.dispatch(actions.editTodo(editData.id, {title:'New Title'}, host))
      .then(() => { // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

  it('creates EDIT_FAILURE when editing a todo returns an error', () => {
    nock(host)
      .put('/api/todo/' + editData.id, '{"title":"New Title"}')
      .reply(500, { message: 'Error updating Todo' })

    const store = mockStore({ todos: [] })

    return store.dispatch(actions.editTodo(editData.id, {title:'New Title'}, host))
      .then(() => { // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

  it('creates TOGGLE_SUCCESS when changing complete status of a todo was successful', () => {
    nock(host)
      .put('/api/todo/' + toggleData.id, '{"done":true}')
      .reply(200, toggleData)

    const store = mockStore({ todos: [] })

    return store.dispatch(actions.toggleTodo(toggleData.id, {done: true}, host))
      .then(() => { // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

  it('creates TOGGLE_FAILURE when changing complete status of a todo returns an error', () => {
    nock(host)
      .put('/api/todo/' + toggleData.id, '{"done":true}')
      .reply(500, { message: 'Error updating Todo' })

    const store = mockStore({ todos: [] })

    return store.dispatch(actions.toggleTodo(toggleData.id, {done:true}, host))
      .then(() => { // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

  it('creates DELETE_SUCCESS when deleting a todo was successful', () => {
    nock(host)
      .delete('/api/todo/' + toggleData.id)
      .reply(200, { message: 'Todo successfully deleted' })

    const store = mockStore({ todos: [] })

    return store.dispatch(actions.deleteTodo(toggleData.id, host))
      .then(() => { // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })

  it('creates DELETE_FAILURE when deleting a todo returns an error', () => {
    nock(host)
      .delete('/api/todo/' + toggleData.id)
      .reply(500, { message: 'Error deleting Todo' })

    const store = mockStore({ todos: [] })

    return store.dispatch(actions.deleteTodo(toggleData.id, host))
      .then(() => { // return of async actions
        expect(store.getActions()).toMatchSnapshot()
      })
  })
})