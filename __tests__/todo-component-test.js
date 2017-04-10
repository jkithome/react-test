import React from 'react'
import { shallow, mount } from 'enzyme'
import {Todo} from '../src/components/Todo'
import moment from 'moment'

function shallowSetup() {
  const props = {
    id: "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8",
    title: "Todo",
    project: "Project",
    done: false,
    url: "https://raw.githubusercontent.com/andela-jkithome/image_files/master/images/image5.jpg",
    createdAt: "2017-03-02T23:04:38.003Z",
    editTodo: jest.fn(),
    toggleTodo: jest.fn(),
    deleteTodo: jest.fn()
  }

  const enzymeWrapper = shallow(<Todo {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

function mountSetup() {
  const props = {
    id: "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8",
    title: "Todo",
    project: "Project",
    done: false,
    url: "https://raw.githubusercontent.com/andela-jkithome/image_files/master/images/image5.jpg",
    createdAt: "2017-03-02T23:04:38.003Z",
    editTodo: jest.fn(),
    toggleTodo: jest.fn(),
    deleteTodo: jest.fn()
  }

  const enzymeWrapper = mount(<Todo {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Shallow rendered Card', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper, props } = shallowSetup()

      // console.log(enzymeWrapper.debug())

      expect(enzymeWrapper.find('img').hasClass('ui image')).toBe(true)
      expect(enzymeWrapper.find('.header').text()).toBe(props.title)
      expect(enzymeWrapper.find('.meta').first().text()).toBe(props.project)
      expect(enzymeWrapper.find('.meta').at(0).text()).toBe(props.project);
      expect(enzymeWrapper.find('.meta').at(1).text()).toBe(`Created ${moment(props.createdAt).fromNow()}`);

      const ModalProps = enzymeWrapper.find('Modal').props()
      expect(ModalProps.open).toBe(false)
      expect(typeof ModalProps.onClose).toBe('function')
      // console.log(ModalProps.onClose);
      // expect(ModalProps.)
      // enzymeWrapper.find('button').forEach(function (node) {
      //   expect(node.hasClass('ui button')).to.equal(true);
      // });
      // expect(enzymeWrapper.find('button').text()).toBe('Edit')
      // Since it's a shallow render Modal Component isn't rendered so only 3 buttons should be present
      expect(enzymeWrapper.find('button.ui').length).toBe(3)
      expect(enzymeWrapper.find('button.ui.basic.red.button').text()).toBe('Delete')
      expect(enzymeWrapper.find('button.ui.inverted.green.button').text()).toBe(' Update')
      expect(enzymeWrapper.find('button.ui.inverted.red.button').text()).toBe(' Cancel')
      expect(enzymeWrapper.containsMatchingElement(<button>Delete</button>)).toBe(true)

      const input = enzymeWrapper.find('input').first();
      expect(input.props().defaultChecked ).toBe(false);

      // const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
      // expect(todoInputProps.newTodo).toBe(true)
      // expect(todoInputProps.placeholder).toEqual('What needs to be done?')
    })

    // it('should call addTodo if length of text is greater than 0', () => {
    //   const { enzymeWrapper, props } = setup()
    //   const input = enzymeWrapper.find('TodoTextInput')
    //   input.props().onSave('')
    //   expect(props.addTodo.mock.calls.length).toBe(0)
    //   input.props().onSave('Use Redux')
    //   expect(props.addTodo.mock.calls.length).toBe(1)
    // })
  })
  describe('Mounted Card', () => {
    let wrapper
    beforeEach(() => {
      const { enzymeWrapper, props } = mountSetup()
      wrapper = enzymeWrapper
    })
    it('should render the modal component', ()=> {
      expect(wrapper.find('button.ui').length).toBe(2)
    })
    it('should update the state property `modalOpen`', () => {
      const button = wrapper.find('button').first();
      button.simulate('click')
      expect(wrapper.state().modalOpen).toEqual(true);
});

  })
})
