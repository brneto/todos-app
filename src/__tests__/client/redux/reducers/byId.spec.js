import deepFreeze from 'deep-freeze';
import byId from '../../../../client/redux/reducers/byId';
import { documents } from '../../../../client/redux/actions';

describe('reducers/byId', () => {
  // given
  const
    filter = 'all',
    initialState = byId(undefined, { type: 'INIT' }) |> deepFreeze,
    baseData = { entities: {
        todos: {
          1: { id: 1, text: 'hey', completed: true },
          2: { id: 2, text: 'ho', completed: true },
          3: { id: 3, text: 'let\'s go', completed: false },
        }
    } },
    baseState = documents.todosFetched(baseData, filter)
      |> a => byId(initialState, a)
      |> deepFreeze;

  it('should handle unknown actions', () => {
    // when
    const newState = byId(initialState, { type: 'FAKE' });

    // then
    expect(newState).toBe(initialState);
  });

  it('should add fetched todos to empty map', () => {
    // when
    const newState = documents.todosFetched(baseData, filter)
      |> a => byId(initialState, a);

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
    const newState = documents.todosFetched(testData, filter)
      |> a => byId(baseState, a);

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add todo to empty map', () => {
    // given
    const testData = { entities: {
      todos: { 4: { id: 4, text: 'wow', completed: false } }
    } };

    // when
    const newState = documents.todoAdded(testData)
      |> a => byId(initialState, a);

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should add todo to non-empty map', () => {
    // given
    const testData = { entities: {
      todos: { 4: { id: 4, text: 'wow', completed: false } }
    } };

    // when
    const newState = documents.todoAdded(testData)
      |> a => byId(baseState, a);

    // then
    expect(newState).toMatchSnapshot();
  });

  it('should toggle todo to non-empty map', () => {
    // given
    const testData = { entities: {
      todos: { 1: { id: 1, text: 'hey', completed: false } }
    } };

    // when
    const newState = documents.todoToggled(testData)
      |> a => byId(baseState, a);

    // then
    expect(newState).toMatchSnapshot();
  });
});
