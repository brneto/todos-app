import { takeEvery, all } from 'redux-saga/effects';
import { effects } from '../actions';
import * as workers from './todosWorkers';

function* rootSaga() {
  try {
    yield all({
      fetchTodosWatcher: takeEvery(effects.fetchTodos, workers.fetchTodos),
      addTodoWatcher: takeEvery(effects.addTodo, workers.addTodo),
      toggleTodoWatcher: takeEvery(effects.toggleTodo, workers.toggleTodo),
    });
  } catch(e) {
    throw new Error('One of the Effects was rejected before all the effects complete: ' + e);
  }
}

export default rootSaga;
