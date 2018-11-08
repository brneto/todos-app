import { createActions } from 'redux-actions';
import { identity } from 'ramda';

export const {
  fetchTodos,
  addTodo,
  toggleTodo,

  setToggleFetching,
  setFetchedTodos,
  setAddedTodo,
  setToggledTodo,
} = createActions(
  {
    SET_FETCHED_TODOS: [identity, (_, filter) => ({ filter })],
  },
  'SET_TOGGLE_FETCHING',
  'SET_ADDED_TODO',
  'SET_TOGGLED_TODO',
  'FETCH_TODOS',
  'ADD_TODO',
  'TOGGLE_TODO',
);
