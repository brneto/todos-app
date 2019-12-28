import { takeEvery, all } from 'redux-saga/effects';
import { effects } from '../actions';
import * as workers from './todosWorkers';

function* rootSaga() {
  yield all({ // eslint-disable-line redux-saga/no-unhandled-errors
    fetchTodosWatcher: takeEvery(effects.fetchTodos, workers.fetchTodos),
    addTodoWatcher: takeEvery(effects.addTodo, workers.addTodo),
    toggleTodoWatcher: takeEvery(effects.toggleTodo, workers.toggleTodo),
  });
}

export default rootSaga;
