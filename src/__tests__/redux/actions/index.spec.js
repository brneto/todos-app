import {
  fetchTodos,
  addTodo,
  toggleTodo,

  setToggleFetching,

  setFetchTodos,
  setAddTodo,
  setToggleTodo,
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
    expect(setToggleFetching(error, filter)).toMatchSnapshot();
  });

  it('setFetchTodos', () => {
    expect(setFetchTodos(response, filter)).toMatchSnapshot();
    expect(setFetchTodos(error, filter)).toMatchSnapshot();
  });

  it('setAddTodo', () => {
    expect(setAddTodo(response)).toMatchSnapshot();
    expect(setAddTodo(error)).toMatchSnapshot();
  });

  it('setToggleTodo', () => {
    expect(setToggleTodo(response)).toMatchSnapshot();
    expect(setToggleTodo(error)).toMatchSnapshot();
  });
});

