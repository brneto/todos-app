import { createActions } from 'redux-actions';
import { createActionFunction } from './helpers';

const messageType = 'SIDE_EFFECT';

// Side Effect Command actions
// Naming Convention: <imperative verb><subject>
export const {
  fetchTodos, addTodo, toggleTodo
} = createActions({
  'FETCH_TODOS': createActionFunction(messageType),
  'ADD_TODO': createActionFunction(messageType),
  'TOGGLE_TODO': createActionFunction(messageType),
});
