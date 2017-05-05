import React from 'react'
import { shallow } from 'enzyme'
import {CreateTodo} from '../src/components/CreateTodo'
import sinon from 'sinon'

const createTodo = jest.fn();

function shallowSetup() {
  const props = {
    createTodo: createTodo
  }

  const enzymeWrapper = shallow(<CreateTodo {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Shallow rendered component', () => {
  let wrapper, sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    Object.getOwnPropertyNames(CreateTodo.prototype).forEach(method => {
      sandbox.spy(CreateTodo.prototype, method);
    })
    const { enzymeWrapper} = shallowSetup();
    wrapper = enzymeWrapper
    createTodo.mockClear();
  })
  afterEach(() => {
    sandbox.restore();
  });
  it('should render the create todo button', () => {
    expect(wrapper.find('div.ui.icon.button').length).toBe(1);

    expect(wrapper.find('button.ui.inverted.button').length).toBe(0)
    expect(wrapper.containsMatchingElement(
      <div className="ui icon button" data-tooltip="Create New Todo" data-position="bottom center" >
        <i className="add icon"></i>
      </div>
      )
    ).toBe(true)
    expect(wrapper.find('button.ui.inverted.button').length).toBe(0);
    expect(wrapper.state().formOpen).toBe(false);
  })
  it('should render the create todo form and call handleOpen when create todo button is clicked', () => {
    const button = wrapper.find('div.ui.icon.button');
    button.simulate('click');
    expect(wrapper.state().formOpen).toBe(true);
    expect(wrapper.find('div.ui.icon.button').length).toBe(0);
    expect(wrapper.find('button.ui.inverted.button').length).toBe(2);
    expect(wrapper.find('button.ui.inverted.green.button').text()).toBe(' Create');
    expect(wrapper.find('button.ui.inverted.red.button').text()).toBe(' Cancel');
    expect(CreateTodo.prototype.handleOpen.calledOnce).toBe(true);
  })
  // it('should call handleOpen when create todo button is clicked', () => {
  //   CreateTodo.prototype.handleOpen = jest.fn()
  //   const { enzymeWrapper} = shallowSetup();
  //   // console.log(wrapper.debug())
  //   // const mock = jest.fn();
  //   // wrapper.instance().handleOpen = mock;
  //   // wrapper.prototype.handleOpen = mock
  //   // wrapper.update();
  //   const button = enzymeWrapper.find('div.ui.icon.button');
  //   button.simulate('click');
  //   // console.log(wrapper.debug())
  //   // console.log(wrapper.state())
  //   // console.log(mock)
  //   expect(CreateTodo.prototype.handleOpen).toBeCalled();
  //   console.log(enzymeWrapper.debug())
  // })
  describe('Creating todos', () => {
    beforeEach(() => {
      const button = wrapper.find('div.ui.icon.button');
      button.simulate('click');
      const titleInput = wrapper.find('input').at(0);
      titleInput.simulate('change', {
        target: {
          value: 'New title',
          name: 'title'
        }
      })
      const projectInput = wrapper.find('input').at(1);
      projectInput.simulate('change', {
        target: {
          value: 'New project',
          name: 'project'
        }
      })
    })
    it('should render the create todo form and call handleOpen when create todo button is clicked', () => {
      expect(wrapper.state().formOpen).toBe(true);
      expect(wrapper.find('div.ui.icon.button').length).toBe(0);
      expect(wrapper.find('button.ui.inverted.button').length).toBe(2);
      expect(wrapper.find('button.ui.inverted.green.button').text()).toBe(' Create');
      expect(wrapper.find('button.ui.inverted.red.button').text()).toBe(' Cancel');
      expect(CreateTodo.prototype.handleOpen.calledOnce).toBe(true);
    })
    it('should change state when input values change and call handleFieldChange', () => {
      expect(wrapper.state().todo.title).toEqual('New title');
      expect(wrapper.state().todo.project).toEqual('New project');
      expect(CreateTodo.prototype.handleFieldChange.calledTwice).toBe(true);
    })
    describe('Submit new todo', () => {
      it('should call handleCreate, createTodo and handleClose when create button is clicked', () => {
        const button = wrapper.find('button.ui.inverted.green.button');
        button.simulate('click');
        expect(CreateTodo.prototype.handleCreate.calledOnce).toBe(true);
        expect(CreateTodo.prototype.handleCreate.calledBefore(CreateTodo.prototype.handleClose)).toBe(true);
        expect(CreateTodo.prototype.handleClose.calledOnce).toBe(true);
        expect(createTodo).toBeCalled();
        expect(createTodo).toBeCalledWith({"project": "New project", "title": "New title"})
      })
    })
    describe('Close create form', () => {
      it('should reset any edits and call handleClose when cancel button is clicked', () => {
        const button = wrapper.find('button.ui.inverted.red.button');
        button.simulate('click');
        expect(CreateTodo.prototype.handleClose.calledOnce).toBe(true);
        expect(wrapper.state().todo).toEqual({title: null, project: null})
        expect(wrapper.state().formOpen).toEqual(false);
      })
    })
  })
})