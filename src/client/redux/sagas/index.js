import { takeEvery, all } from 'redux-saga/effects';
import { fetchTodos, addTodo, toggleTodo } from '../actions';
import * as sagas from './todosWorkers';

function* watchFetchTodos() {
  yield takeEvery(fetchTodos, sagas.fetchTodos);
}

function* watchAddTodo() {
  yield takeEvery(addTodo, sagas.addTodo);
}

function* watchToggleTodo() {
  yield takeEvery(toggleTodo, sagas.toggleTodo);
}

export default function* rootSaga() {
  // eslint-disable-next-line redux-saga/no-unhandled-errors
  yield all([
    watchFetchTodos(),
    watchAddTodo(),
    watchToggleTodo(),
  ]);
}
