import { normalize } from 'normalizr';
import { all, call, put, select, cancel } from 'redux-saga/effects';
import { commands, events, documents } from '../actions';
import * as selectors from '../reducers';
import * as api from '../../api';
import * as schema from '../../libs/schema';

function* fetchTodos({ payload: filter }) {
  try {
    const fetchStatus = yield select(selectors.getFetchStatus);
    if (fetchStatus.isLoading) yield cancel();

    if (!filter) filter = yield select(selectors.getFilter);
    yield put(events.startedFetch(filter));

    const
      response = yield call(api.todos.fetchTodos, filter),
      data = normalize(response, schema.todoList);

    yield put(documents.todosFetched(data, filter));
    yield put(events.succeedFetch(filter));
  } catch (error) {
    yield put(documents.todosFetched(error, filter));
    yield put(events.failedFetch(filter));
  }
}

function* addTodo({ payload: text }) {
  let filter;

  try {
    filter = yield select(selectors.getFilter);

    const
      response = yield call(api.todos.addTodo, text),
      data = normalize(response, schema.todo);

    yield put(documents.todoAdded(data, filter));
  } catch (error) {
    yield put(documents.todoAdded(error, filter));
  }
}

function* toggleTodo({ payload: id }) {
  let filter;

  try {
    filter = yield select(selectors.getFilter);

    const
      response = yield call(api.todos.toggleTodo, id),
      data = normalize(response, schema.todo);

    yield updateFilterLists(data);
    yield put(documents.todoToggled(data, filter));
  } catch (error) {
    yield put(documents.todoToggled(error, filter));
  }
}

function updateFilterLists(data) {
  const
    id = data.result,
    { entities: { todos: { [id]: { completed: isTodoCompleted } } } } = data,
    activeList = 'active',
    completedList = 'completed';

  try {
    return all (isTodoCompleted
      ? [
        put(commands.removeTodoFromList(data, activeList)),
        put(commands.addTodoToList(data, completedList))
      ]
      : [
        put(commands.removeTodoFromList(data, completedList)),
        put(commands.addTodoToList(data, activeList))
      ]
    );
  } catch(e) {
    throw new Error('An Effects on switcher method was rejected before complete: ' + e);
  }
}

export { fetchTodos, addTodo, toggleTodo };
