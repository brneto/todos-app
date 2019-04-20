import { takeEvery, all } from 'redux-saga/effects';
import { fetchTodos, addTodo, toggleTodo } from '../actions';
import * as workers from './todosWorkers';

function* rootSaga() {
  yield all({ // eslint-disable-line redux-saga/no-unhandled-errors
    fetchTodosWatcher: takeEvery(fetchTodos, workers.fetchTodos),
    addTodoWatcher: takeEvery(addTodo, workers.addTodo),
    toggleTodoWatcher: takeEvery(toggleTodo, workers.toggleTodo),
  });
}

export default rootSaga;
