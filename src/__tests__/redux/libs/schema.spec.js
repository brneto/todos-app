import { normalize } from 'normalizr';
import { todo, todoList } from '../../../client/libs/schema';

describe('schema', () => {
  it('should work for list of todos', () => {
    const data = [{
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

    const expectedData = {
      entities: {
        todos: {
          1: {
            id: 1,
            text: 'hey',
            completed: true,
          },
          2: {
            id: 2,
            text: 'ho',
            completed: true,
          },
          3: {
            id: 3,
            text: 'let\'s go',
            completed: false,
          },
        }
      },
      result: [1, 2, 3]
    };

    expect(normalize(data, todoList)).toEqual(expectedData);
  });

  it('should work for one todo', () => {
    const data = {
      id: 1,
      text: 'hey',
      completed: true,
    };

  const expectedData = {
    entities: {
      todos: {
        1: {
          id: 1,
          text: 'hey',
          completed: true,
        }
      }
    },
    result: 1
  };

  expect(normalize(data, todo)).toEqual(expectedData);
  });
});
