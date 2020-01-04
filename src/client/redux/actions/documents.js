import { createActions } from 'redux-actions';
import { metaFilterCreator } from './utils';

// Document actions
// Naming Convention: <subject><past-tense verb>
export const {
  todosFetched, todoAdded, todoToggled
} = createActions({
  TODOS_FETCHED: metaFilterCreator,
  TODO_ADDED: metaFilterCreator,
  TODO_TOGGLED: metaFilterCreator,
});
