import deepFreeze from 'deep-freeze';
import byId from '../../../client/redux/reducers/byId';
import {
  setFetchedTodos,
  setAddedTodo,
  setToggledTodo
} from '../../../client/redux/actions';

describe('reducers/byId', () => {
  const filter = 'all';
  const initialState = deepFreeze(byId(undefined, { type: 'INIT' }));
  const baseData = {
    entities: {
      todos: {
        1: {
          id: 1,
          text: 'hey',
          completed: true
        },
        2: {
          id: 2,
          text: 'ho',
          completed: true
        },
        3: {
          id: 3,
          text: 'let\'s go',
          completed: false
        }
      }
    }
  };
  const baseState = deepFreeze(
    byId(initialState, setFetchedTodos(baseData, filter))
  );

  it('should handle unknown actions', () => {
    expect(byId(initialState, { type: 'FAKE' })).toBe(initialState);
  });

  it('should add fetched todos to empty map', () => {
    expect(
      byId(initialState, setFetchedTodos(baseData, filter))
    ).toMatchSnapshot();
  });

  it('should add fetched todos to non-empty map', () => {
    const testData = {
      entities: {
        todos: {
          4: {
            id: 4,
            text: 'wow',
            completed: false
          },
          5: {
            id: 5,
            text: 'cool',
            completed: true
          }
        }
      }
    };

    expect(byId(baseState, setFetchedTodos(testData, filter))).toMatchSnapshot();
  });

  it('should add todo to empty map', () => {
    const testData = {
      entities: {
        todos: {
          4: {
            id: 4,
            text: 'wow',
            completed: false
          }
        }
      }
    };

    expect(byId(initialState, setAddedTodo(testData))).toMatchSnapshot();
  });

  it('should add todo to non-empty map', () => {
    const testData = {
      entities: {
        todos: {
          4: {
            id: 4,
            text: 'wow',
            completed: false
          }
        }
      }
    };

    expect(byId(baseState, setAddedTodo(testData))).toMatchSnapshot();
  });

  it('should toggle todo to non-empty map', () => {
    const testData = {
      entities: {
        todos: {
          1: {
            id: 1,
            text: 'hey',
            completed: false
          }
        }
      }
    };

    expect(byId(baseState, setToggledTodo(testData))).toMatchSnapshot();
  });
});
