// Link.react-test.js
import React from 'react';
import { TodoList } from '../../src/components/TodoList';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import to_json from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

it('Renders correctly when fetching todos', () => {
  const wrapper = shallow(
    <TodoList
      todo= {{
        requesting: true,
        todos: [],
        error: null,
      }}
      fetchTodos = {jest.fn()}
    ></TodoList>, { context: { store: mockStore() } }
  );
  expect(to_json(wrapper)).toMatchSnapshot();
});

it('Renders correctly when there are no todos', () => {
  const wrapper = shallow(
    <TodoList
      todo= {{
        requesting: false,
        todos: [],
        error: null,
      }}
      fetchTodos = {jest.fn()}
    ></TodoList>, { context: { store: mockStore() } }
  );
  expect(to_json(wrapper)).toMatchSnapshot();
});

it('Renders correctly when todos are fetched', () => {
  const wrapper = shallow(
    <TodoList
      todo = {{
        requesting: true,
        todos: [{
          id: "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8",
          title: "Todo",
          project: "Project",
          done: false,
          url: "https://raw.githubusercontent.com/andela-jkithome/image_files/master/images/image5.jpg",
          createdAt: "2017-03-02T23:04:38.003Z",
          editTodo: jest.fn(),
          toggleTodo: jest.fn(),
          deleteTodo: jest.fn()
        }],
        error: null,
      }}
      fetchTodos = {jest.fn()}
    ></TodoList>, { context: { store: mockStore() } }
  );
  expect(to_json(wrapper)).toMatchSnapshot();
});