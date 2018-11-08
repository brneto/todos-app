import { createActions } from 'redux-actions';
import { identity } from 'ramda';

const filterHandler = [identity, (_, filter) => ({ filter })];

export const {
  fetchTodos,
  addTodo,
  toggleTodo,

  setToggleFetching,
  setFetchedTodos,
  setAddedTodo,
  setToggledTodo,
  setToggledTodoAdd,
  setToggledTodoRemove,
} = createActions(
  {
    SET_FETCHED_TODOS: filterHandler,
    SET_TOGGLED_TODO_ADD: filterHandler,
    SET_TOGGLED_TODO_REMOVE: filterHandler,
  },
  'SET_TOGGLE_FETCHING',
  'SET_ADDED_TODO',
  'SET_TOGGLED_TODO',
  'FETCH_TODOS',
  'ADD_TODO',
  'TOGGLE_TODO',
);
