import deepFreeze from 'deep-freeze';
import createList from '../../../client/redux/reducers/createList';
import {
  setFetchTodos,
  setAddTodo,
  setToggleTodo,
  setToggleFetching
} from '../../../client/redux/actions';

describe('reducers/createList', () => {
  const filter = 'active';
  const listByFilter = createList(filter);
  const initialState = deepFreeze(listByFilter(undefined, { type: 'INIT' }));
  const baseData = { result: [1, 2, 3] };
  const baseState = deepFreeze(
    listByFilter(initialState, setFetchTodos(baseData, filter))
  );
  const error = new Error('Boom!');

  it('should handle unknown actions', () => {
    expect(listByFilter(initialState, { type: 'FAKE' })).toBe(initialState);
  });

  it('should add fetched todos to empty list', () => {
    expect(
      listByFilter(initialState, setFetchTodos(baseData, filter))
    ).toMatchSnapshot();
  });

  it('should add fetched todos to non-empty list', () => {
    const testData = { result: [4, 5, 6] };

    expect(
      listByFilter(baseState, setFetchTodos(testData, filter))
    ).toMatchSnapshot();
  });

  it('should add fetched todos saves error message', () => {
    expect(listByFilter(baseState, setFetchTodos(error, filter)))
    .toMatchSnapshot();
  });

  it('should add todo to empty list', () => {
    const testData = { result: 4 };

    expect(
      listByFilter(initialState, setAddTodo(testData, filter))
    ).toMatchSnapshot();
  });

  it('should add todo to non-empty list', () => {
    const testData = { result: 4 };

    expect(
      listByFilter(baseState, setAddTodo(testData, filter))
    ).toMatchSnapshot();
  });

  it('should add todo save error message', () => {
    expect(listByFilter(baseState, setAddTodo(error)))
    .toMatchSnapshot();
  });

  it('should toggle todo remove one id from list', () => {
    const testData = {
      entities: {
        todos: {
          1: {
            id: 1,
            text: 'Learn Redux',
            completed: true
          }
        }
      },
      result: 1
    };

    expect(listByFilter(baseState, setToggleTodo(testData, filter)))
    .toMatchSnapshot();
  });

  it('should toggle todo saves error message', () => {
    const filter = 'all';
    const listByFilter = createList(filter);
    const initialState = deepFreeze(listByFilter(undefined, { type: 'INIT' }));
    const baseData = { result: [1, 2, 3] };
    const baseState = deepFreeze(
      listByFilter(initialState, setFetchTodos(baseData, filter))
    );

    expect(listByFilter(baseState, setToggleTodo(error)))
    .toMatchSnapshot();
  });

  it('should toggle fetching parameter', () => {
    const firstState = listByFilter(baseState, setToggleFetching(filter));
    expect(firstState.isFetching).toBe(true);

    const secondState = listByFilter(firstState, setToggleFetching(filter));
    expect(secondState.isFetching).toBe(false);
  });
});
