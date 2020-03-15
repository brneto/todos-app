import { createActions } from 'redux-actions';
import { createActionFunction } from './functions';

const actionFunction = createActionFunction('COMMAND');

// Pure Command actions message
// Naming Convention: <imperative verb><subject>
export const {
  addTodoToList, removeTodoFromList
} = createActions({
  ADD_TODO_TO_LIST: actionFunction,
  REMOVE_TODO_FROM_LIST: actionFunction,
});
