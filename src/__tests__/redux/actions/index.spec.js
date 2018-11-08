import {
  fetchTodos,
  addTodo,
  toggleTodo,

  setToggleFetching,

  setFetchedTodos,
  setAddedTodo,
  setToggledTodo,
} from '../../../client/redux/actions';

describe('actions', () => {
  const filter = 'filterName';
  const error = new Error('Boom!');
  const response = 'responseData';

  it('fetchTodos', () => {
    expect(fetchTodos()).toMatchSnapshot();
  });

  it('addTodo', () => {
    expect(addTodo('hello!')).toMatchSnapshot();
  });

  it('toggleTodo', () => {
    expect(toggleTodo('123')).toMatchSnapshot();
  });

  it('setToggleFetching', () => {
    expect(setToggleFetching(filter)).toMatchSnapshot();
    expect(setToggleFetching(error)).toMatchSnapshot();
  });

  it('setFetchedTodos', () => {
    expect(setFetchedTodos(response, filter)).toMatchSnapshot();
    expect(setFetchedTodos(error, filter)).toMatchSnapshot();
  });

  it('setAddedTodo', () => {
    expect(setAddedTodo(response)).toMatchSnapshot();
    expect(setAddedTodo(error)).toMatchSnapshot();
  });

  it('setToggledTodo', () => {
    expect(setToggledTodo(response)).toMatchSnapshot();
    expect(setToggledTodo(error)).toMatchSnapshot();
  });
});

