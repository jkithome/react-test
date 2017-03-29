import fetch from 'isomorphic-fetch';

export const fetchRequest = () => ({
  type: 'TODO_REQUEST'
});

export const fetchSuccess = (todos) => ({
  type: 'TODO_SUCCESS',
  todos
});

export const fetchFailure = (failure) => ({
  type: 'TODO_FAILURE',
  failure
});

export const createRequest = () => ({
  type: 'CREATE_REQUEST'
});

export const createSuccess = (todo) => ({
  type: 'CREATE_SUCCESS',
  todo
});

export const createFailure = (failure) => ({
  type: 'CREATE_FAILURE',
  failure
});

export const editRequest = () => ({
  type: 'EDIT_REQUEST'
});

export const editSuccess = (todo) => ({
  type: 'EDIT_SUCCESS',
  todo
});

export const editFailure = (failure) => ({
  type: 'EDIT_FAILURE',
  failure
});

export const deleteRequest = () => ({
  type: 'DELETE_REQUEST'
});

export const deleteSuccess = (id) => ({
  type: 'DELETE_SUCCESS',
  id
});

export const deleteFailure = (failure) => ({
  type: 'DELETE_FAILURE',
  failure
});

export const toggleRequest = () => ({
  type: 'TOGGLE_REQUEST'
});

export const toggleSuccess = (todo) => ({
  type: 'TOGGLE_SUCCESS',
  todo
});

export const toggleFailure = (failure) => ({
  type: 'TOGGLE_FAILURE',
  failure
});

export const fetchTodos = (testing) => (dispatch) => {
  let url = '/api/todos';
  if (testing) {
    url = testing + url
  }
  dispatch(fetchRequest());
  return fetch(url)
  .then(response => {
    if (!response.ok) {
      return response.json().then(Promise.reject.bind(Promise));
    }
    return response.json();
  }).then(json => {
    return dispatch(fetchSuccess(json));
  }).catch(err => {
    console.log(err);
    return dispatch(fetchFailure('Error Fetching Todos!'));
  });
};

export const createTodo = (todo) => (dispatch) => {
  dispatch(createRequest());
  return fetch('/api/todos', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(todo)
    }).then(response => {
      if (!response.ok) {
        return response.json().then(Promise.reject.bind(Promise));
      }
      return response.json();
    }).then(json => {
      return dispatch(createSuccess(json));
    }).catch(err => {
      return dispatch(createFailure('Error Creating Todo!'));
    });
};

export const editTodo = (id, todo) => (dispatch) => {
  dispatch(editRequest);
  return fetch('/api/todo/' + id, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(todo)
  }).then(response => {
    if (!response.ok) {
      return response.json().then(Promise.reject.bind(Promise));
    }
    return response.json();
  }).then(json => {
    return dispatch(editSuccess(json));
  }).catch(err => {
    return dispatch(editFailure('Error Editing Todo!'));
  });
}

export const toggleTodo = (id, todo) => (dispatch) => {
  dispatch(toggleRequest);
  return fetch('/api/todo/' + id, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(todo)
  }).then(response => {
    if (!response.ok) {
      return response.json().then(Promise.reject.bind(Promise));
    }
    return response.json();
  }).then(json => {
    return dispatch(toggleSuccess(json));
  }).catch(err => {
    return dispatch(toggleFailure('Error Updating Complete Status!'));
  });
}

export const deleteTodo = (id) => (dispatch) => {
  dispatch(deleteRequest);
  fetch('/api/todo/' + id, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    }).then(response => {
      if (!response.ok) {
        return response.json().then(Promise.reject.bind(Promise));
      }
      return response.json();
    }).then(json => {
      return dispatch(deleteSuccess(id));
    }).catch(err => {
      return dispatch(deleteFailure('Error Deleting Todo!'));
    });
}
