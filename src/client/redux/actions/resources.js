import { createActions } from 'redux-actions';

// Side Effect Command actions
// Naming Convention: <imperative verb><subject>
export const {
  fetchTodosResource, addTodoResource, toggleTodoResource
} = createActions(
  'FETCH_TODOS_RESOURCE',
  'ADD_TODO_RESOURCE',
  'TOGGLE_TODO_RESOURCE',
);
