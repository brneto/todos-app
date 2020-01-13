import { put, select } from 'redux-saga/effects';
import * as selectors from '../reducers';
import * as api from '../../api';

function* getTodosResource({ payload: filter }) {
  try {
    if (!filter) filter = yield select(selectors.getFilter);

    yield put(api.todos.fetchTodos(filter));
  } catch (e) {
    throw new Error('getTodosResource Effect was rejected before complete: ' + e);
  }
}

export { getTodosResource };
