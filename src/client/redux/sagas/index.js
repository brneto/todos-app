import { takeEvery, all } from 'redux-saga/effects';
import { fetchTodos, addTodo, toggleTodo } from '../actions';
import * as workers from './todosWorkers';

export default function* rootSaga() {
// eslint-disable-next-line redux-saga/no-unhandled-errors
  yield all({
    fetchTodosWatcher: takeEvery(fetchTodos, workers.fetchTodos),
    todoWatcher: takeEvery([addTodo, toggleTodo], workers.setTodo)
  });
}
