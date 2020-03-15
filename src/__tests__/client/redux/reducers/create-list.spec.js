import deepFreeze from 'deep-freeze';
import createList from '../../../../client/redux/reducers/create-list';
import { commands, events, documents } from '../../../../client/redux/actions';

describe('reducers/createList', () => {
  const
    filter = 'active',
    listByFilter = createList(filter),
    initialState = deepFreeze(listByFilter(undefined, { type: 'INIT' })),
    error = new Error('Boom!'),
    baseData = { result: [1, 2, 3] },
    baseState = deepFreeze(listByFilter(initialState, documents.todosFetched(baseData, filter)));

  it('should handle unknown actions', () => {
    // when
    const newState = listByFilter(initialState, { type: 'FAKE' });

    // then
    expect(newState).toBe(initialState);
  });

  it('should add fetched todos to empty list', () => {
    // when
    const newState = listByFilter(initialState, documents.todosFetched(baseData, filter));

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add fetched todos to non-empty list', () => {
    // given
    const testData = { result: [4, 5, 6] };

    // when
    const newState = listByFilter(baseState, documents.todosFetched(testData, filter));

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add fetched todos saves error message', () => {
    // when
    const newState = listByFilter(baseState, documents.todosFetched(error, filter));

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add todo to empty list', () => {
    // given
    const testData = { result: 4 };

    // when
    const newState = listByFilter(initialState, documents.todoAdded(testData, filter));

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add todo to non-empty list', () => {
    // given
    const testData = { result: 4 };

    // when
    const newState = listByFilter(baseState, documents.todoAdded(testData, filter));

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add todo save error message', () => {
    // when
    const newState = listByFilter(baseState, documents.todoAdded(error, filter));

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add a todo to the list', () => {
    // given
    const data = { result: 5 };

    // when
    const newState = listByFilter(baseState, commands.addTodoToList(data, filter));

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should remove a todo from the list', () => {
    // given
    const data = { result: 1 };

    // when
    const newState = listByFilter(baseState, commands.removeTodoFromList(data, filter));

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should toggle todo saves error message', () => {
    // given
    const
      filter = 'all',
      listByFilter = createList(filter),
      initialState = deepFreeze(listByFilter(undefined, { type: 'INIT' })),
      baseData = { result: [1, 2, 3] },
      baseState = deepFreeze(listByFilter(initialState, documents.todosFetched(baseData, filter)));

    // when
    const newState = listByFilter(baseState, documents.todoToggled(error, filter));

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should set fetching state to true', () => {
    // when
    const newState = listByFilter(baseState, events.fetchingTodos(filter));

    // then
    expect(newState.isFetching).toBe(true);
  });

  it('should set fetching state to false', () => {
    // when
    const newState = listByFilter(baseState, events.fetchedTodos(filter));

    // then
    expect(newState.isFetching).toBe(false);
  });
});
