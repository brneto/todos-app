import { normalize } from 'normalizr';
import { call, put, select, cancel } from 'redux-saga/effects';
import { events, documents } from '../actions';
import * as selectors from '../reducers';
import * as api from '../../api';
import * as schema from '../../libs/schema';

function* fetchTodos() {
  let filter;

  try {
    const isFetching = yield select(selectors.getIsFetching);
    if (isFetching) yield cancel();

    filter = yield select(selectors.getFilter);
    yield put(events.fetchingTodos(filter));

    const
      response = yield call(api.todos.fetchTodos, filter),
      data = normalize(response, schema.todoList);

    yield put(documents.todosFetched(data, filter));
  } catch (error) {
    yield put(documents.todosFetched(error, filter));
  } finally {
    yield put(events.fetchedTodos(filter));
  }
}

function* addTodo({ payload: text }) {
  let filter;

  try {
    filter = yield select(selectors.getFilter);

    const
      response = yield call(api.todos.addTodo, text),
      data = normalize(response, schema.todo);

    yield put(documents.todoAdded(data, filter));
  } catch (error) {
    yield put(documents.todoAdded(error, filter));
  }
}

function* toggleTodo({ payload: id }) {
  let filter;

  try {
    filter = yield select(selectors.getFilter);

    const
      response = yield call(api.todos.toggleTodo, id),
      data = normalize(response, schema.todo);

    yield put(documents.todoToggled(data, filter));
  } catch (error) {
    yield put(documents.todoToggled(error, filter));
  }
}

export { fetchTodos, addTodo, toggleTodo };
