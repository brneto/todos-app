import { createActions } from 'redux-actions';
import { createActionFunction } from './functions';

const
  messageType = 'SIDE_EFFECT',
  actionFunction = createActionFunction(messageType);

// Side Effect Command actions
// Naming Convention: <imperative verb><subject>
export const {
  fetchTodos, addTodo, toggleTodo
} = createActions({
  'FETCH_TODOS': actionFunction,
  'ADD_TODO': actionFunction,
  'TOGGLE_TODO': actionFunction,
});
