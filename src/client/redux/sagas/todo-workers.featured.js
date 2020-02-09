import { put, select } from 'redux-saga/effects';
import { resources } from '../actions';
import * as selectors from '../reducers';
import * as api from '../../api';

function* fetchTodosResource({ payload: filter }) {
  try {
    if (!filter) filter = yield select(selectors.getFilter);

    let resource = api.createResource(api.todos.fetchTodos(filter));

    yield put(resources.fetchTodosResource(resource));
  } catch (e) {
    throw new Error('fetchTodosResource Resource was rejected before complete: ' + e);
  }
}

function* addTodoResource({ payload: text }) {
  try {
    let resource = api.createResource(api.todos.addTodo(text));

    yield put(resources.addTodoResource(resource));
  } catch (e) {
    throw new Error('addTodoResource Resource was rejected before complete: ' + e);
  }
}

export { fetchTodosResource, addTodoResource };
