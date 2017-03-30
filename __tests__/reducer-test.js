import reducer from '../src/redux/modules/todo/reducer'
import * as actions from '../src/redux/modules/todo/actions'

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {}))
    .toEqual({
        requesting: false,
        todos: [],
        error: null,
    })
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
    ).toEqual({
      requesting: true,
      todos: [],
      error: null,
    })
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
        todos: [
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
      }
      )
    ).toEqual({
      requesting: false,
      todos: [
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
      ],
      error: null
    })
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
    ).toEqual({
      requesting: false,
      todos: [],
      error: 'Error Fetching Todos!'
    })
  })

  // it('should handle ADD_TODO', () => {
      //   expect(
      //     reducer([], {
      //       type: types.ADD_TODO,
      //       text: 'Run the tests'
      //     })
      //   ).toEqual(
      //     [
      //       {
      //         text: 'Run the tests',
      //         completed: false,
      //         id: 0
      //       }
      //     ]
      //   )

      //   expect(
      //     reducer(
      //       [
      //         {
      //           text: 'Use Redux',
      //           completed: false,
      //           id: 0
      //         }
      //       ],
      //       {
      //         type: types.ADD_TODO,
      //         text: 'Run the tests'
      //       }
      //     )
      //   ).toEqual(
      //     [
      //       {
      //         text: 'Run the tests',
      //         completed: false,
      //         id: 1
      //       },
      //       {
      //         text: 'Use Redux',
      //         completed: false,
      //         id: 0
      //       }
      //     ]
      //   )
      // })

})