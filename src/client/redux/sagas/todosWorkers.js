import { normalize } from 'normalizr';
import { curry, prop, compose } from 'ramda';
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
  } catch (error) {
    yield put(actions.setFetchedTodos(error, filter));
  } finally {
    yield put(actions.setToggleFetching(filter));
  }
}

export function* addTodo({ payload: text }) {
  try {
    const response = yield call(api.addTodo, text);
    const data = normalize(response, schema.todo);

    yield put(actions.setAddedTodo(data));
  } catch (error) {
    yield put(actions.setAddedTodo(error));
  }
}

export function* toggleTodo({ payload: id }) {
  try {
    const response = yield call(api.toggleTodo, id);
    const data = normalize(response, schema.todo);
    const toggledId = data.result;

    const getCompleted = compose(
      prop('completed'),
      prop(toggledId),
      prop('todos'),
      prop('entities')
    );
    const createAddToggledTodo = curry((f, i) =>
      actions.setToggledTodoAdd(i, f)
    );
    const createRemoveToggledTodo = curry((f, i) =>
      actions.setToggledTodoRemove(i, f)
    );

    const completed = getCompleted(data);
    const addToggledTodo = completed
      ? createAddToggledTodo('completed')
      : createAddToggledTodo('active');
    const removeToggledTodo = completed
      ? createRemoveToggledTodo('active')
      : createRemoveToggledTodo('completed');

    yield put(addToggledTodo(id));
    yield put(removeToggledTodo(id));
    yield put(actions.setToggledTodo(data));
  } catch (error) {
    yield put(actions.setToggledTodo(error));
  }
}
