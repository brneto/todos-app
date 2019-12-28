import deepFreeze from 'deep-freeze';
import createList from '../../../client/redux/reducers/createList';
import {
  setFetchedTodos,
  setAddedTodo,
  setToggledTodo,
  setToggledTodoAdd,
  setToggledTodoRemove,
  setToggleFetching
} from '../../../client/redux/actions/oldIndex';

describe('reducers/createList', () => {
  const filter = 'active';
  const listByFilter = createList(filter);
  const initialState = deepFreeze(listByFilter(undefined, { type: 'INIT' }));
  const baseData = { result: [1, 2, 3] };
  const baseState = deepFreeze(
    listByFilter(initialState, setFetchedTodos(baseData, filter))
  );
  const error = new Error('Boom!');

  it('should handle unknown actions', () => {
    expect(listByFilter(initialState, { type: 'FAKE' })).toBe(initialState);
  });

  it('should add fetched todos to empty list', () => {
    expect(
      listByFilter(initialState, setFetchedTodos(baseData, filter))
    ).toMatchSnapshot();
  });

  it('should add fetched todos to non-empty list', () => {
    const testData = { result: [4, 5, 6] };

    expect(
      listByFilter(baseState, setFetchedTodos(testData, filter))
    ).toMatchSnapshot();
  });

  it('should add fetched todos saves error message', () => {
    expect(listByFilter(baseState, setFetchedTodos(error, filter)))
    .toMatchSnapshot();
  });

  it('should add todo to empty list', () => {
    const testData = { result: 4 };

    expect(
      listByFilter(initialState, setAddedTodo(testData, filter))
    ).toMatchSnapshot();
  });

  it('should add todo to non-empty list', () => {
    const testData = { result: 4 };

    expect(
      listByFilter(baseState, setAddedTodo(testData, filter))
    ).toMatchSnapshot();
  });

  it('should add todo save error message', () => {
    expect(listByFilter(baseState, setAddedTodo(error)))
    .toMatchSnapshot();
  });

  it('should toggle todo add one id from list', () => {
    const testId = 5;

    expect(listByFilter(baseState, setToggledTodoAdd(testId, filter)))
    .toMatchSnapshot();
  });

  it('should toggle todo remove one id from list', () => {
    const testId = 1;

    expect(listByFilter(baseState, setToggledTodoRemove(testId, filter)))
    .toMatchSnapshot();
  });

  it('should toggle todo saves error message', () => {
    const filter = 'all';
    const listByFilter = createList(filter);
    const initialState = deepFreeze(listByFilter(undefined, { type: 'INIT' }));
    const baseData = { result: [1, 2, 3] };
    const baseState = deepFreeze(
      listByFilter(initialState, setFetchedTodos(baseData, filter))
    );

    expect(listByFilter(baseState, setToggledTodo(error)))
    .toMatchSnapshot();
  });

  it('should toggle fetching parameter', () => {
    const firstState = listByFilter(baseState, setToggleFetching(filter));
    expect(firstState.isFetching).toBe(true);

    const secondState = listByFilter(firstState, setToggleFetching(filter));
    expect(secondState.isFetching).toBe(false);
  });
});
