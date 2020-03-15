import { createActions } from 'redux-actions';
import { createActionFunction } from './functions';

const actionFunction = createActionFunction('SIDE_EFFECT');

// Side Effect Command actions
// Naming Convention: <imperative verb><subject>
export const {
  fetchTodos, addTodo, toggleTodo
} = createActions({
  'FETCH_TODOS': actionFunction,
  'ADD_TODO': actionFunction,
  'TOGGLE_TODO': actionFunction,
});
