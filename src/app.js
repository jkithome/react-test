import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './redux/store';
import TodoList from './components/TodoList';

const store = configureStore();

const App = ({store}) => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired
};

ReactDOM.render(
    <App store={store} />,
  document.getElementById('content')
);
