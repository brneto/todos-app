import { createActions } from 'redux-actions';
import { createActionFunction } from './helpers';

const messageType = 'COMMAND';

// Pure Command actions message
// Naming Convention: <imperative verb><subject>
export const {
  createResource, addTodoToList, removeTodoFromList
} = createActions({
  CREATE_RESOURCE: createActionFunction(messageType),
  ADD_TODO_TO_LIST: createActionFunction(messageType),
  REMOVE_TODO_FROM_LIST: createActionFunction(messageType),
});
