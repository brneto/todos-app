import { createActions } from 'redux-actions';

// Side Effect Command actions
// Naming Convention: <imperative verb><subject>
export const {
  fetchTodos, addTodo, toggleTodo
} = createActions(
  'FETCH_TODOS', 'ADD_TODO', 'TOGGLE_TODO'
);
