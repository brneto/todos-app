import { createActions } from 'redux-actions';

// Event actions
// Naming Convention:
// - Instant event: <present-tense verb>
// - Progressive event start: <present-continuous verb>[<subject>]
// - Progressive event end: <past-tense verb>[<subject>]
export const {
  fetchingTodos,
  fetchedTodos,
} = createActions(
  'FETCHING_TODOS',
  'FETCHED_TODOS'
);
