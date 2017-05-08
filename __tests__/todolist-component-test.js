import React from 'react'
import { shallow } from 'enzyme'
import {TodoList} from '../src/components/TodoList'
import sinon from 'sinon'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
jest.mock('../src/components/Todo', () => 'Todo' )
jest.mock('../src/components/CreateTodo', () => 'CreateTodo' )

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

let fetchTodos  = jest.fn();

describe('Todolist component', () => {
  afterEach(() => {
    fetchTodos.mockClear();
  })
  describe('Fetching todos', () => {
    const props = {
      todo: {
        requesting: true,
        todos: [],
        error: null,
      },
      fetchTodos: fetchTodos
    }

    const wrapper = shallow(
    <TodoList {...props}></TodoList>, { context: { store: mockStore() } }
    );
    it('should render correctly when fetching todos', () => {
      expect(fetchTodos).toBeCalled();
      expect(wrapper.find('div.content').text()).toBe('React Testing')
      expect(wrapper.find('div.ui.centered.container.one.column.grid').length).toBe(2)
      expect(wrapper.find('CreateTodo').length).toBe(1)
      expect(wrapper.find('div.ui.active.loader.big').length).toBe(1)
      expect(wrapper.find('div.ui.centered.container.three.column.grid').length).toBe(0)
      expect(wrapper.find('Todo').length).toBe(0)
      expect(wrapper.find('div.Column').length).toBe(0)
    })
  })
  describe('No todos', () => {
    const props = {
      todo: {
        requesting: false,
        todos: [],
        error: null,
      },
      fetchTodos: fetchTodos
    }

    const wrapper = shallow(
    <TodoList {...props}></TodoList>, { context: { store: mockStore() } }
    );
    it('Should render correctly when done fetching and no todos are present', () => {
      expect(wrapper.find('div.content').text()).toBe('React Testing')
      expect(wrapper.find('div.ui.centered.container.one.column.grid').length).toBe(1)
      expect(wrapper.find('CreateTodo').length).toBe(1)
      expect(wrapper.find('div.ui.active.loader.big').length).toBe(0)
      expect(wrapper.find('div.ui.centered.container.three.column.grid').length).toBe(1)
      expect(wrapper.find('div.Column').at(0).text()).toBe('No Todos')
      expect(wrapper.find('Todo').length).toBe(0)
    })
  })
  describe('With todos', () => {
    const props = {
      todo: {
        requesting: false,
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
      },
      fetchTodos: fetchTodos
    }

    const wrapper = shallow(
    <TodoList {...props}></TodoList>, { context: { store: mockStore() } }
    );
    it('Should render correctly when done fetching and todos are present', () => {
      expect(wrapper.find('div.content').text()).toBe('React Testing')
      expect(wrapper.find('div.ui.centered.container.one.column.grid').length).toBe(1)
      expect(wrapper.find('CreateTodo').length).toBe(1)
      expect(wrapper.find('div.ui.active.loader.big').length).toBe(0)
      expect(wrapper.find('div.ui.centered.container.three.column.grid').length).toBe(1)
      expect(wrapper.find('div.Column').length).toBe(0)
      expect(wrapper.find('Todo').length).toBe(1)
    })
  })
})
