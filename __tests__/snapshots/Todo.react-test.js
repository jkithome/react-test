// Link.react-test.js
import React from 'react';
import {Todo} from '../../src/components/Todo';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import to_json from 'enzyme-to-json';
import moment from 'moment';

it('Renders correctly', () => {
  const component = renderer.create(
    <Todo
      id = '1'
      title = 'Todo'
      project = 'Project'
      done = {false}
      url = 'https://www.testurl.com/images/image'
      createdAt = {moment().subtract(1, 'days').format()}
      editTodo = {(id, todo) => { console.log(id, JSON.stringify(todo))}}
      toggleTodo = {(id, bool) => { console.log(id, bool)}}
      deleteTodo = {(id) => { console.log(id)}}
    ></Todo>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseEnter();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseLeave();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});

it('Clicking edit button brings up modal', () => {
  const wrapper = shallow(
    <Todo
      id = '1'
      title = 'Todo'
      project = 'Project'
      done = {false}
      url = 'https://www.testurl.com/images/image'
      createdAt = {moment().subtract(1, 'days').format()}
      editTodo = {(id, todo) => { console.log(id, JSON.stringify(todo))}}
      toggleTodo = {(id, bool) => { console.log(id, bool)}}
      deleteTodo = {(id) => { console.log(id)}}
    ></Todo>
    )
  wrapper.find('button.ui.green.button').simulate('click');

  // wrapper.find('#sortByName').prop('className')).toEqual('SelectedBTN');
 // });
  expect(to_json(wrapper)).toMatchSnapshot();
})