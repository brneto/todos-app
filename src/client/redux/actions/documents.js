import { createActions } from 'redux-actions';
import { metaFilterListCreator } from './utils';

// Document actions
// Naming Convention: <subject><past-tense verb>
export const { todosFetched, todoAdded, todoToggled } =
  createActions(
    { TODOS_FETCHED: metaFilterListCreator },
    'TODO_ADDED',
    'TODO_TOGGLED',
  );
