import { createActions } from 'redux-actions';
import { identity } from 'ramda';

const
  metaDataCreator = [identity, (payload, filter) => ({ filter })];

// Document actions
// Naming Convention: <subject><past-tense verb>
export const {
  todosFetched,
  todoAdded,
  todoToggled,
} = createActions({
  TODOS_FETCHED: metaDataCreator,
  TODO_ADDED: metaDataCreator,
  TODO_TOGGLED: metaDataCreator,
});
