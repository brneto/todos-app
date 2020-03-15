import { put } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { normalize } from 'normalizr';
import { effects, commands, events, documents } from '../../../../client/redux/actions';
import * as selectors from '../../../../client/redux/reducers';
import * as schema from '../../../../client/libs/schema';
import * as sagas from '../../../../client/redux/sagas/todo-workers';
import * as api from '../../../../client/api';

describe('sagas/todosWorkers', () => {
  it('should call fetchTodos api', () => {
    const
      filter = 'all',
      response = [
        { id: 1, text: 'hey', completed: true },
        { id: 2, text: 'ho', completed: true },
        { id: 3, text: 'let\'s go', completed: false },
      ],
      data = normalize(response, schema.todoList);

    testSaga(sagas.fetchTodos, effects.fetchTodos(filter))
    .next()
    .select(selectors.getFetchStatus)
    .next({
      isIdle: true,
      isLoading: false,
      isResolved: false,
      isRejected: false,
    })
    .put(events.startedFetch(filter))
    .next()
    .call(api.todos.fetchTodos, filter)
    .next(response)
    .put(documents.todosFetched(data, filter))
    .next()
    .put(events.succeedFetch(filter))
    .next()
    .isDone();
  });

  it('should call filter selector', () => {
    //given
    const
      filter = 'all',
      response = [
        { id: 1, text: 'hey', completed: true },
        { id: 2, text: 'ho', completed: true },
        { id: 3, text: 'let\'s go', completed: false },
      ],
      data = normalize(response, schema.todoList);

    // when-then
    testSaga(sagas.fetchTodos, effects.fetchTodos())
    .next()
    .select(selectors.getFetchStatus)
    .next({
      isIdle: true,
      isLoading: false,
      isResolved: false,
      isRejected: false,
    })
    .select(selectors.getFilter)
    .next(filter)
    .put(events.startedFetch(filter))
    .next()
    .call(api.todos.fetchTodos, filter)
    .next(response)
    .put(documents.todosFetched(data, filter))
    .next()
    .put(events.succeedFetch(filter))
    .next()
    .isDone();
  });

  it('should not call fetchTodos api', () => {
    testSaga(sagas.fetchTodos, effects.fetchTodos())
    .next()
    .select(selectors.getFetchStatus)
    .next({
      isIdle: false,
      isLoading: true,
      isResolved: false,
      isRejected: false,
    })
    .cancel();
  });

  it('should call addTodo api', () => {
    const
      filter = 'all',
      text = 'Test',
      response = { id: 1, text, completed: false },
      data = normalize(response, schema.todo);

    testSaga(sagas.addTodo, effects.addTodo(text))
    .next()
    .select(selectors.getFilter)
    .next(filter)
    .call(api.todos.addTodo, text)
    .next(response)
    .put(documents.todoAdded(data, filter))
    .next()
    .isDone();
  });

  it('should call toggleTodo api with not completed todo', () => {
    const
      filter = 'all',
      id = 1,
      response = { id: 1, text: 'Test', completed: false },
      data = normalize(response, schema.todo);

    try {
      testSaga(sagas.toggleTodo, effects.toggleTodo(id))
      .next()
      .select(selectors.getFilter)
      .next(filter)
      .call(api.todos.toggleTodo, id)
      .next(response)
      .all([
        put(commands.removeTodoFromList(data, 'completed')),
        put(commands.addTodoToList(data, 'active'))
      ])
      .next()
      .put(documents.todoToggled(data, filter))
      .next()
      .isDone();
    } catch (e) {
      throw new Error('One of the Effects was rejected before all the effects complete: ' + e);
    }
  });

  it('should call toggleTodo api with completed todo', () => {
    const
      filter = 'all',
      id = 1,
      response = { id: 1, text: 'Test', completed: true },
      data = normalize(response, schema.todo);

    try {
      testSaga(sagas.toggleTodo, effects.toggleTodo(id))
      .next()
      .select(selectors.getFilter)
      .next(filter)
      .call(api.todos.toggleTodo, id)
      .next(response)
      .all([
        put(commands.removeTodoFromList(data, 'active')),
        put(commands.addTodoToList(data, 'completed'))
      ])
      .next()
      .put(documents.todoToggled(data, filter))
      .next()
      .isDone();
    } catch (e) {
      throw new Error('One of the Effects was rejected before all the effects complete: ' + e);
    }
  });
});
