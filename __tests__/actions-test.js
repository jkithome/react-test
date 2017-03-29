import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../src/redux/modules/todo/actions'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const fetchTodosUrl = 'https://localhost:8000';
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

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates TODO_SUCCESS when fetching todos has been done', () => {
    nock(fetchTodosUrl)
      .get('/api/todos')
      .reply(200, fetchTodosData)

    const expectedActions = [
      { type: 'TODO_REQUEST' },
      { type: 'TODO_SUCCESS', todos: fetchTodosData }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchTodos(fetchTodosUrl))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})