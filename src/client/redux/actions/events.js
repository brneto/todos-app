import { createActions } from 'redux-actions';

// Event actions
// Naming Convention:
// - Instant event: <present-tense verb>
// - Progressive event start: <present-continuous verb>[<subject>]
// - Progressive event end: <past-tense verb>[<subject>]
export const {
  fetchingTodoList,
  fetchedTodoList,
} = createActions(
  'FETCHING_TODO_LIST',
  'FETCHED_TODO_LIST'
);
