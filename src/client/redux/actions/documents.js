import { createActions } from 'redux-actions';
import { createActionFunction } from './functions';

const actionFunction = createActionFunction('DOCUMENT');

// Document actions
// Naming Convention: <subject><past-tense verb>
export const {
  todosFetched, todoAdded, todoToggled
} = createActions({
  TODOS_FETCHED: actionFunction,
  TODO_ADDED: actionFunction,
  TODO_TOGGLED: actionFunction,
});
