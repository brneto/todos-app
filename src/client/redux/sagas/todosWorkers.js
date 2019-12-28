import { normalize } from 'normalizr';
import { all, call, put, select, cancel } from 'redux-saga/effects';
import { commands, events, documents } from '../actions';
import * as selectors from '../reducers';
import * as api from '../../api';
import * as schema from '../../libs/schema';

function* fetchTodos() {
  let filter;
  try {
    const isFetching = yield select(selectors.getIsFetching);
    if (isFetching) yield cancel();

    filter = yield select(selectors.getFilter);
    yield put(events.fetchingTodos(filter));

    const
      response = yield call(api.todos.fetchTodos, filter),
      data = normalize(response, schema.todoList);

    yield put(documents.todosFetched(data, filter));
  } catch (error) {
    yield put(documents.todosFetched(error, filter));
  } finally {
    yield put(events.fetchedTodos(filter));
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
      data = normalize(response, schema.todo);

    yield switchTodoBetweenLists(data, 'active', 'completed');
    yield put(documents.todoToggled(data));
  } catch (error) {
    yield put(documents.todoToggled(error));
  }
}

function* switchTodoBetweenLists(data, filterA, filterB) {
  const
    id = data.result,
    { entities: { todos: { [id]: { completed: isTodoCompleted } } } } = data;

  try {
    yield all (isTodoCompleted
      ? [
        put(commands.removeTodoFromList(data, filterA)),
        put(commands.addTodoToList(data, filterB))
      ]
      : [
        put(commands.removeTodoFromList(data, filterB)),
        put(commands.addTodoToList(data, filterA))
      ]
    );
  } catch(e) {
    throw new Error('An Effects on switcher method was rejected before complete: ' + e);
  }
}

export {
  fetchTodos,
  addTodo,
  toggleTodo,
};
