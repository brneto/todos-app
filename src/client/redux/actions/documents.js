import { createActions } from 'redux-actions';
import { createActionFunction } from './helpers';

const messageType = 'DOCUMENT';

// Document actions
// Naming Convention: <subject><past-tense verb>
export const {
  todosFetched, todoAdded, todoToggled
} = createActions({
  TODOS_FETCHED: createActionFunction(messageType),
  TODO_ADDED: createActionFunction(messageType),
  TODO_TOGGLED: createActionFunction(messageType),
});
