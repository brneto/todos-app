import deepFreeze from 'deep-freeze';
import createList from '../../../client/redux/reducers/createList';
import { events, documents } from '../../../client/redux/actions';

describe('reducers/createList', () => {
  const
    filter = 'active',
    listByFilter = createList(filter),
    initialState = listByFilter(undefined, { type: 'INIT' }) |> deepFreeze,
    error = new Error('Boom!'),
    baseData = { result: [1, 2, 3] },
    baseState = documents.todosFetched(baseData, filter)
      |> a => listByFilter(initialState, a)
      |> deepFreeze;

  it('should handle unknown actions', () => {
    // when
    const newState = listByFilter(initialState, { type: 'FAKE' });

    // then
    expect(newState).toBe(initialState);
  });

  it('should add fetched todos to empty list', () => {
    // when
    const newState = documents.todosFetched(baseData, filter)
      |> a => listByFilter(initialState, a);

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add fetched todos to non-empty list', () => {
    // given
    const testData = { result: [4, 5, 6] };

    // when
    const newState = documents.todosFetched(testData, filter)
      |> a => listByFilter(baseState,a);

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add fetched todos saves error message', () => {
    // when
    const newState = documents.todosFetched(error, filter)
      |> a => listByFilter(baseState, a);

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add todo to empty list', () => {
    // given
    const testData = { result: 4 };

    // when
    const newState = documents.todoAdded(testData, filter)
      |> a => listByFilter(initialState, a);

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add todo to non-empty list', () => {
    // given
    const testData = { result: 4 };

    // when
    const newState = documents.todoAdded(testData, filter)
      |> a => listByFilter(baseState, a);

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add todo save error message', () => {
    // when
    const newState = documents.todoAdded(error, filter)
      |> a => listByFilter(baseState, a);

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should toggle todo saves error message', () => {
    // given
    const
      filter = 'all',
      listByFilter = createList(filter),
      initialState = listByFilter(undefined, { type: 'INIT' }) |> deepFreeze,
      baseData = { result: [1, 2, 3] },
      baseState = documents.todosFetched(baseData, filter)
        |> a => listByFilter(initialState, a)
        |> deepFreeze;

    // when
    const newState = documents.todoToggled(error, filter)
      |> a => listByFilter(baseState, a);

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should set fetching state to true', () => {
    // when
    const newState = events.fetchingTodos(filter)
      |> a => listByFilter(baseState, a);

    // then
    expect(newState.isFetching).toBe(true);
  });

  it('should set fetching state to false', () => {
    // when
    const newState = events.fetchedTodos(filter)
      |> a => listByFilter(baseState, a);

    // then
    expect(newState.isFetching).toBe(false);
  });
});
