import deepFreeze from 'deep-freeze';
import byId from '../../../../client/redux/reducers/by-id';
import { documents } from '../../../../client/redux/actions';

describe('reducers/byId', () => {
  // given
  const
    filter = 'all',
    initialState = deepFreeze(byId(undefined, { type: 'INIT' })),
    baseData = { entities: {
        todos: {
          1: { id: 1, text: 'hey', completed: true },
          2: { id: 2, text: 'ho', completed: true },
          3: { id: 3, text: 'let\'s go', completed: false },
        }
    } },
    baseState = deepFreeze(byId(initialState, documents.todosFetched(baseData, filter)));

  it('should handle unknown actions', () => {
    // when
    const newState = byId(initialState, { type: 'FAKE' });

    // then
    expect(newState).toBe(initialState);
  });

  it('should add fetched todos to empty map', () => {
    // when
    const newState = byId(initialState, documents.todosFetched(baseData, filter));

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add fetched todos to non-empty map', () => {
    // given
    const testData = { entities: {
        todos: {
          4: { id: 4, text: 'wow', completed: false },
          5: { id: 5, text: 'cool', completed: true },
        }
    } };

    // when
    const newState = byId(baseState, documents.todosFetched(testData, filter));

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add todo to empty map', () => {
    // given
    const testData = { entities: {
      todos: { 4: { id: 4, text: 'wow', completed: false } }
    } };

    // when
    const newState = byId(initialState, documents.todoAdded(testData));

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add todo to non-empty map', () => {
    // given
    const testData = { entities: {
      todos: { 4: { id: 4, text: 'wow', completed: false } }
    } };

    // when
    const newState = byId(baseState, documents.todoAdded(testData));

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should toggle todo to non-empty map', () => {
    // given
    const testData = { entities: {
      todos: { 1: { id: 1, text: 'hey', completed: false } }
    } };

    // when
    const newState = byId(baseState, documents.todoToggled(testData));

    // then
    expect(newState).toMatchSnapshot();
  });
});
