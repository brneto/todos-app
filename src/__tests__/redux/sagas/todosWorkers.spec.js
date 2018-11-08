import { testSaga } from 'redux-saga-test-plan';
import { normalize } from 'normalizr';
import * as actions from '../../../client/redux/actions';
import * as selectors from '../../../client/redux/reducers';
import * as schema from '../../../client/libs/schema';
import * as sagas from '../../../client/redux/sagas/todosWorkers';
import * as api from '../../../client/api';

describe('sagas/TodosWorkers', () => {
  it('should call fetchTodos api', () => {
    const filter = 'all';
    const response = [{
      id: 1,
      text: 'hey',
      completed: true,
    }, {
      id: 2,
      text: 'ho',
      completed: true,
    }, {
      id: 3,
      text: 'let\'s go',
      completed: false,
    }];
    const data = normalize(response, schema.todoList);

    testSaga(sagas.fetchTodos)
    .next()
    .select(selectors.getIsFetching)
    .next(false)
    .select(selectors.getFilter)
    .next(filter)
    .put(actions.setToggleFetching(filter))
    .next()
    .call(api.fetchTodos, filter)
    .next(response)
    .put(actions.setFetchedTodos(data, filter))
    .next()
    .put(actions.setToggleFetching(filter))
    .next()
    .isDone();
  });

  it('should not call fetchTodos api', () => {
    testSaga(sagas.fetchTodos)
    .next()
    .select(selectors.getIsFetching)
    .next(true)
    .cancel();
  });

  it('should call addTodo api', () => {
    const text = 'Test';
    const response = {
      id: 1,
      text,
      completed: false,
    };
    const data = normalize(response, schema.todo);

    testSaga(sagas.addTodo, actions.addTodo(text))
    .next()
    .call(api.addTodo, text)
    .next(response)
    .put(actions.setAddedTodo(data))
    .next()
    .isDone();
  });

  it('should call toggleTodo api', () => {
    const id = 1;
    const response = {
      id: 1,
      text: 'Test',
      completed: false,
    };
    const data = normalize(response, schema.todo);

    testSaga(sagas.toggleTodo, actions.toggleTodo(id))
    .next()
    .call(api.toggleTodo, id)
    .next(response)
    .put(actions.setToggledTodoAdd(id, 'active'))
    .next()
    .put(actions.setToggledTodoRemove(id, 'completed'))
    .next()
    .put(actions.setToggledTodo(data))
    .next()
    .isDone();
  });
});
