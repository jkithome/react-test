// Link.react-test.js
import React from 'react';
import {CreateTodo} from '../../src/components/CreateTodo';
import { shallow } from 'enzyme';
import to_json from 'enzyme-to-json';

it('Renders correctly', () => {
  const wrapper = shallow(
    <CreateTodo
      createTodo = {jest.fn()}
    ></CreateTodo>
  );
  expect(to_json(wrapper)).toMatchSnapshot();
});

it('Clicking plus button brings up create form', () => {
  const wrapper = shallow(
    <CreateTodo
      createTodo = {jest.fn()}
    ></CreateTodo>
  );
  wrapper.find('div.ui.icon.button').simulate('click');
  expect(to_json(wrapper)).toMatchSnapshot();
})