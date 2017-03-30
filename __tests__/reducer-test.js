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