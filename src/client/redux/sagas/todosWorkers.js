import { normalize } from 'normalizr';
import { curry, prop, compose } from 'ramda';
import { call, put, select, cancel } from 'redux-saga/effects';
import * as actions from '../actions/oldIndex';
import { documents } from '../actions';
import * as selectors from '../reducers';
import * as api from '../../api';
import * as schema from '../../libs/schema';

function* fetchTodos() {
  let filter;
  try {
    const isFetching = yield select(selectors.getIsFetching);
    if (isFetching) yield cancel();

    filter = yield select(selectors.getFilter);
    yield put(actions.setToggleFetching(filter));

    const
      response = yield call(api.todos.fetchTodos, filter),
      data = normalize(response, schema.todoList);

    yield put(documents.todosFetched(data, filter));
  } catch (error) {
    yield put(documents.todosFetched(error, filter));
  } finally {
    yield put(actions.setToggleFetching(filter));
  }
}

function* addTodo({ payload: text }) {
  try {
    const
      response = yield call(api.todos.addTodo, text),
      data = normalize(response, schema.todo);

    yield put(documents.todoAdded(data));
  } catch (error) {
    yield put(documents.todoAdded(error));
  }
}

function* toggleTodo({ payload: id }) {
  try {
    const
      response = yield call(api.todos.toggleTodo, id),
      data = normalize(response, schema.todo),
      // toggledId = data.result;
      { result: toggledId = null } = data;

    const
      getCompleted = compose(
        prop('completed'),
        prop(toggledId),
        prop('todos'),
        prop('entities')
      ),
      createAddToggledTodo = curry((f, i) =>
        actions.setToggledTodoAdd(i, f)
      ),
      createRemoveToggledTodo = curry((f, i) =>
        actions.setToggledTodoRemove(i, f)
      );

    const
      completed = getCompleted(data),
      addToggledTodo = completed
        ? createAddToggledTodo('completed')
        : createAddToggledTodo('active'),
      removeToggledTodo = completed
        ? createRemoveToggledTodo('active')
        : createRemoveToggledTodo('completed');

    yield put(addToggledTodo(id));
    yield put(removeToggledTodo(id));
    yield put(documents.todoToggled(data));
  } catch (error) {
    yield put(documents.todoToggled(error));
  }
}

export {
  fetchTodos,
  addTodo,
  toggleTodo,
};
