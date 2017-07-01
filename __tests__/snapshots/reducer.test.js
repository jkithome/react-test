import reducer from '../../src/redux/modules/todo/reducer'
import * as actions from '../../src/redux/modules/todo/actions'

describe('todos reducer', () => {
  let todo = {
    "id": "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8",
    "title": "Todo",
    "project": "Project",
    "done": false,
    "image": "https://raw.githubusercontent.com/andela-jkithome/image_files/master/images/image5.jpg",
    "createdAt": "2017-03-02T23:04:38.003Z",
    "modifiedAt": "2017-03-22T16:44:29.034Z"
  }
  let todos = [
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
  ]
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('should handle TODO_REQUEST', () => {
    expect(
      reducer({
        requesting: false,
        todos: [],
        error: null
      },
      {
        type: 'TODO_REQUEST'
      })
    ).toMatchSnapshot()
  })

  it('should handle TODO_SUCCESS', () => {
    expect(
      reducer({
        requesting: true,
        todos: [],
        error: null
      },
      {
        type: 'TODO_SUCCESS',
        todos
      }
      )
    ).toMatchSnapshot()
  })

  it('should handle TODO_FAILURE', () => {
    expect(
      reducer({
        requesting: true,
        todos: [],
        error: null
      },
      {
        type: 'TODO_FAILURE',
        failure: 'Error Fetching Todos!'
      }
      )
    ).toMatchSnapshot()
  })

  it('should handle CREATE_REQUEST', () => {
    expect(
      reducer({
        requesting: false,
        todos: [],
        error: null
      },
      {
        type: 'CREATE_REQUEST'
      })
    ).toMatchSnapshot()
  })

  it('should handle CREATE_SUCCESS', () => {
    expect(
      reducer({
        requesting: true,
        todos: [],
        error: null
      },
      {
        type: 'CREATE_SUCCESS',
        todo,
      }
      )
    ).toMatchSnapshot()
  })

  it('should handle CREATE_FAILURE', () => {
    expect(
      reducer({
        requesting: true,
        todos: [],
        error: null
      },
      {
        type: 'CREATE_FAILURE',
        failure: 'Error Creating Todo!'
      }
      )
    ).toMatchSnapshot()
  })

  it('should handle EDIT_REQUEST', () => {
    expect(
      reducer({
        requesting: false,
        todos: [todo],
        error: null
      },
      {
        type: 'EDIT_REQUEST'
      })
    ).toMatchSnapshot()
  })

  it('should handle EDIT_SUCCESS', () => {
    expect(
      reducer({
        requesting: true,
        todos: [todo],
        error: null
      },
      {
        type: 'EDIT_SUCCESS',
        todo: Object.assign({}, todo, {
            "title": "Todo Edited"
          })
      }
      )
    ).toMatchSnapshot()
  })

  it('should handle EDIT_FAILURE', () => {
    expect(
      reducer({
        requesting: true,
        todos: [todo],
        error: null
      },
      {
        type: 'EDIT_FAILURE',
        failure: 'Error Editing Todo!'
      }
      )
    ).toMatchSnapshot()
  })

  it('should handle TOGGLE_REQUEST', () => {
    expect(
      reducer({
        requesting: false,
        todos: [todo],
        error: null
      },
      {
        type: 'TOGGLE_REQUEST'
      })
    ).toMatchSnapshot()
  })

  it('should handle TOGGLE_SUCCESS', () => {
    expect(
      reducer({
        requesting: true,
        todos: [todo],
        error: null
      },
      {
        type: 'TOGGLE_SUCCESS',
        todo: Object.assign({},todo,{
            "done": true,
          })
      }
      )
    ).toMatchSnapshot()
  })

  it('should handle TOGGLE_FAILURE', () => {
    expect(
      reducer({
        requesting: true,
        todos: [todo],
        error: null
      },
      {
        type: 'TOGGLE_FAILURE',
        failure: 'Error Updating Complete Status!'
      }
      )
    ).toMatchSnapshot()
  })

  it('should handle DELETE_REQUEST', () => {
    expect(
      reducer({
        requesting: false,
        todos: [todo],
        error: null
      },
      {
        type: 'DELETE_REQUEST'
      })
    ).toMatchSnapshot()
  })

  it('should handle DELETE_SUCCESS', () => {
    expect(
      reducer({
        requesting: true,
        todos: [todo],
        error: null
      },
      {
        type: 'DELETE_SUCCESS',
        id: "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8"
      }
      )
    ).toMatchSnapshot()
  })

  it('should handle DELETE_FAILURE', () => {
    expect(
      reducer({
        requesting: true,
        todos: [todo],
        error: null
      },
      {
        type: 'DELETE_FAILURE',
        failure: 'Error Deleting Todo!'
      }
      )
    ).toMatchSnapshot()
  })
})