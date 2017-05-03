import React from 'react'
import { shallow, mount } from 'enzyme'
import {Todo} from '../src/components/Todo'
import moment from 'moment'
import sinon from 'sinon'

const editTodo = jest.fn();
const toggleTodo = jest.fn();
const deleteTodo = jest.fn();

function shallowSetup() {
  const props = {
    id: "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8",
    title: "Todo",
    project: "Project",
    done: false,
    url: "https://raw.githubusercontent.com/andela-jkithome/image_files/master/images/image5.jpg",
    createdAt: "2017-03-02T23:04:38.003Z",
    editTodo: editTodo,
    toggleTodo: toggleTodo,
    deleteTodo: deleteTodo
  }

  const enzymeWrapper = shallow(<Todo {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Shallow rendered Card', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper, props } = shallowSetup()
      expect(enzymeWrapper.find('img').hasClass('ui image')).toBe(true)
      expect(enzymeWrapper.find('.header').text()).toBe(props.title)
      expect(enzymeWrapper.find('.meta').first().text()).toBe(props.project)
      expect(enzymeWrapper.find('.meta').at(0).text()).toBe(props.project);
      expect(enzymeWrapper.find('.meta').at(1).text()).toBe(`Created ${moment(props.createdAt).fromNow()}`);
      expect(enzymeWrapper.find('button.ui').length).toBe(2)
      expect(enzymeWrapper.find('button.ui.basic.red.button').text()).toBe('Delete')
      expect(enzymeWrapper.find('button.ui.basic.green.button').text()).toBe('Edit')
      expect(enzymeWrapper.containsMatchingElement(<button>Delete</button>)).toBe(true)
      expect(enzymeWrapper.containsMatchingElement(<button>Edit</button>)).toBe(true)

      const input = enzymeWrapper.find('input').first();
      expect(input.props().defaultChecked ).toBe(false);
    })
  })
  describe('Mounted Card', () => {
    let wrapper, props_, sandbox
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.spy(Todo.prototype, "handleOpen");
      sandbox.spy(Todo.prototype, "handleClose");
      sandbox.spy(Todo.prototype, "handleFieldChange");
      sandbox.spy(Todo.prototype, "handleEdit");
      sandbox.spy(Todo.prototype, "handleDelete");
      sandbox.spy(Todo.prototype, "handleToggle");
      const { enzymeWrapper, props } = shallowSetup()
      wrapper = enzymeWrapper;
      props_ = props;
      editTodo.mockClear();
      toggleTodo.mockClear();
      deleteTodo.mockClear();
    })
    afterEach(() => {
      sandbox.restore();
    });
    it('should update the state property `formOpen` and call handleOpen when edit button is clicked', () => {
      const button = wrapper.find('button').first();
      button.simulate('click')
      expect(Todo.prototype.handleOpen.calledOnce).toBe(true);
      expect(wrapper.state().formOpen).toEqual(true);
    })
    it('should display different buttons', () => {
      const button = wrapper.find('button').first();
      button.simulate('click')
      expect(wrapper.find('button.ui').length).toBe(2)
      expect(wrapper.find('button.ui.basic.red.button').text()).toBe(' Cancel')
      expect(wrapper.find('button.ui.basic.green.button').text()).toBe(' Update')
    })
    it('should display current values in edit fields', () =>{
      const button = wrapper.find('button').first();
      button.simulate('click')
      expect(wrapper.find('input').at(0).props().defaultValue).toEqual(props_.title)
      expect(wrapper.find('input').at(1).props().defaultValue).toEqual(props_.project)
    })
    it('should call handleToggle and toggleTodo when checked value is changed', () => {
      const checkbox = wrapper.find('input').first();
      checkbox.simulate('change')
      expect(Todo.prototype.handleToggle.calledOnce).toBe(true);
      expect(toggleTodo).toBeCalled();
      expect(toggleTodo).toBeCalledWith(props_.id, {done: !props_.done})
    })
    it('should call handleDelete and deleteTodo when delete button is clicked', () => {
      const button = wrapper.find('button.ui.basic.red.button');
      button.simulate('click')
      expect(Todo.prototype.handleDelete.calledOnce).toBe(true);
      expect(deleteTodo).toBeCalled();
      expect(deleteTodo).toBeCalledWith(props_.id)
    })
    describe('Editing todos', () => {
      beforeEach(() => {
        const button = wrapper.find('button').first();
        button.simulate('click')
        const titleInput = wrapper.find('input').at(0);
        titleInput.simulate('change', {
          target: {
            value: 'Changed title',
            name: 'title'
          }
        })
        const projectInput = wrapper.find('input').at(1);
        projectInput.simulate('change', {
          target: {
            value: 'Changed project',
            name: 'project'
          }
        })
      })
      it('should change state when input values change and call handleFieldChange', () => {
        expect(wrapper.state().todo.title).toEqual('Changed title');
        expect(wrapper.state().todo.project).toEqual('Changed project');
        expect(Todo.prototype.handleFieldChange.calledTwice).toBe(true);
      })
      describe('Submit edits', () => {
        it('should call handleEdit, editTodo and handleClose when update button is clicked', () => {
          const button = wrapper.find('button.ui.basic.green.button');
          button.simulate('click');
          expect(Todo.prototype.handleEdit.calledOnce).toBe(true);
          expect(Todo.prototype.handleEdit.calledBefore(Todo.prototype.handleClose)).toBe(true);
          expect(Todo.prototype.handleClose.calledOnce).toBe(true);
          expect(editTodo).toBeCalled();
          expect(editTodo).toBeCalledWith(props_.id, {"project": "Changed project", "title": "Changed title"})
        })
      })
      describe('Close edit form', () => {
        it('should reset any edits and call handleClose when cancel button is clicked', () => {
          const button = wrapper.find('button.ui.basic.red.button');
          button.simulate('click');
          expect(Todo.prototype.handleClose.calledOnce).toBe(true);
          expect(wrapper.state().todo).toEqual({})
          expect(wrapper.state().formOpen).toEqual(false);
        })
      })
    })
  })
})
