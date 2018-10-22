import { normalize } from 'normalizr';
import { call, put, select, cancel } from 'redux-saga/effects';
import * as actions from '../actions';
//import { getFilter, getIsFetching } from '../reducers';
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

    yield put(actions.setFetchTodos(data, filter));
  } catch(error) {
    yield put(actions.setFetchTodos(error, filter));
  } finally {
    yield put(actions.setToggleFetching(filter));
  }
}


export function* addTodo({ payload: text }) {
  try {
    const response = yield call(api.addTodo, text);
    const data = normalize(response, schema.todo);

    yield put(actions.setAddTodo(data));
  } catch(error) {
    yield put(actions.setAddTodo(error));
  }
}

export function* toggleTodo({ payload: id }) {
  try {
    const response = yield call(api.toggleTodo, id);
    const data = normalize(response, schema.todo);

    yield put(actions.setToggleTodo(data));
  } catch(error) {
    yield put(actions.setToggleTodo(error));
  }
}
