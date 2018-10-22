import { createActions } from 'redux-actions';

export const {
  fetchTodos,
  addTodo,
  toggleTodo,

  setToggleFetching,

  setFetchTodos,
  setAddTodo,
  setToggleTodo,
} = createActions(
  {
    SET_TOGGLE_FETCHING: [
      () => null,
      (payload, meta) => ({ filter: payload instanceof Error ? meta : payload })
    ],
    SET_FETCH_TODOS: [
      payload => payload,
      (todos, filter) => ({ filter })
    ],
  },
  'SET_ADD_TODO',
  'SET_TOGGLE_TODO',
  'FETCH_TODOS',
  'ADD_TODO',
  'TOGGLE_TODO',
);
