import fetch from 'isomorphic-fetch';

const fetchRequest = () => ({
  type: 'TODO_REQUEST'
});

const fetchSuccess = (todos) => ({
  type: 'TODO_SUCCESS',
  todos
});

const fetchFailure = (failure) => ({
  type: 'TODO_FAILURE',
  failure
});

const createRequest = () => ({
  type: 'CREATE_REQUEST'
});

const createSuccess = (todo) => ({
  type: 'CREATE_SUCCESS',
  todo
});

const createFailure = (failure) => ({
  type: 'CREATE_FAILURE',
  failure
});

const editRequest = () => ({
  type: 'EDIT_REQUEST'
});

const editSuccess = (todo) => ({
  type: 'EDIT_SUCCESS',
  todo
});

const editFailure = (failure) => ({
  type: 'EDIT_FAILURE',
  failure
});

const deleteRequest = () => ({
  type: 'DELETE_REQUEST'
});

const deleteSuccess = (id) => ({
  type: 'DELETE_SUCCESS',
  id
});

const deleteFailure = (failure) => ({
  type: 'DELETE_FAILURE',
  failure
});

const toggleRequest = () => ({
  type: 'TOGGLE_REQUEST'
});

const toggleSuccess = (todo) => ({
  type: 'TOGGLE_SUCCESS',
  todo
});

const toggleFailure = (failure) => ({
  type: 'TOGGLE_FAILURE',
  failure
});

export const fetchTodos = () => (dispatch) => {
  dispatch(fetchRequest());
  return fetch('/api/todos', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then(response => {
    if (!response.ok) {
      return response.json().then(Promise.reject.bind(Promise));
    }
    return response.json();
  }).then(json => {
    return dispatch(fetchSuccess(json));
  }).catch(err => {
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
