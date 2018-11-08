import { normalize } from 'normalizr';
import { call, put, select, cancel } from 'redux-saga/effects';
import * as actions from '../actions';
import * as selectors from '../reducers';
import * as api from '../../api';
import * as schema from '../../libs/schema';

export function* fetchTodos() {
  try {
    const isFetching = yield select(selectors.getIsFetching);
    if (isFetching) {
      yield cancel();
    }

    var filter = yield select(selectors.getFilter);
    yield put(actions.setToggleFetching(filter));

    const response = yield call(api.fetchTodos, filter);
    const data = normalize(response, schema.todoList);

    yield put(actions.setFetchedTodos(data, filter));
  } catch(error) {
    yield put(actions.setFetchedTodos(error, filter));
  } finally {
    yield put(actions.setToggleFetching(filter));
  }
}

function* todo(api, payload, action) {
  try {
    const response = yield call(api, payload);
    const data = normalize(response, schema.todo);

    yield put(action(data));
  } catch(error) {
    yield put(action(error));
  }
}

export function* setTodo(action) {
  const { type, payload } = action;
  const { addTodo, setAddedTodo, toggleTodo, setToggledTodo } = actions;

  switch (type) {
    case addTodo.toString():
      yield* todo(api.addTodo, payload, setAddedTodo);
      break;

    case toggleTodo.toString():
      yield* todo(api.toggleTodo, payload, setToggledTodo);
      break;
  }
}
