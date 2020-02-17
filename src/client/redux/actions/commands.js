import { createActions } from 'redux-actions';
import { createActionFunction } from './helper';

const messageType = 'COMMAND';

// Pure Command actions message
// Naming Convention: <imperative verb><subject>
export const {
  addTodoToList, removeTodoFromList
} = createActions({
  ADD_TODO_TO_LIST: createActionFunction(messageType),
  REMOVE_TODO_FROM_LIST: createActionFunction(messageType),
});
