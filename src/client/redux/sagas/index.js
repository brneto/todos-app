import { put, takeEvery, all } from 'redux-saga/effects';
import { effects, commands } from '../actions';
import { getFilterPath } from '../reducers';
import * as workers from './todo-workers';

function* rootSaga() {
  try {
    yield put(commands.createResource(getFilterPath()));
    yield all({
      addTodoWatcher: takeEvery(effects.addTodo, workers.addTodo),
      toggleTodoWatcher: takeEvery(effects.toggleTodo, workers.toggleTodo),
    });
  } catch(e) {
    throw new Error('One of the Effects was rejected before all the effects complete: ' + e);
  }
}

export default rootSaga;
