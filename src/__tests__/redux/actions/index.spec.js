import {
  fetchTodos,
  addTodo,
  toggleTodo,

  setToggleFetching,

  setFetchedTodos,
  setAddedTodo,
  setToggledTodo,
} from '../../../client/redux/actions/oldIndex';

describe('actions', () => {
  const filter = 'filterName';
  const error = new Error('Boom!');
  const response = 'responseData';

  test('fetchTodos', () => {
    expect(fetchTodos()).toMatchSnapshot();
  });

  test('addTodo', () => {
    expect(addTodo('hello!')).toMatchSnapshot();
  });

  test('toggleTodo', () => {
    expect(toggleTodo('123')).toMatchSnapshot();
  });

  test('setToggleFetching', () => {
    expect(setToggleFetching(filter)).toMatchSnapshot();
    expect(setToggleFetching(error)).toMatchSnapshot();
  });

  test('setFetchedTodos', () => {
    expect(setFetchedTodos(response, filter)).toMatchSnapshot();
    expect(setFetchedTodos(error, filter)).toMatchSnapshot();
  });

  test('setAddedTodo', () => {
    expect(setAddedTodo(response)).toMatchSnapshot();
    expect(setAddedTodo(error)).toMatchSnapshot();
  });

  test('setToggledTodo', () => {
    expect(setToggledTodo(response)).toMatchSnapshot();
    expect(setToggledTodo(error)).toMatchSnapshot();
  });
});

