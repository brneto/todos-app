import { createActions } from 'redux-actions';
import { createActionFunction } from './functions';

const messageType = 'EVENT';

// Event actions
// Naming Convention:
// - Instant event: <present-tense verb>
// - Progressive event start: <present-continuous verb>[<subject>]
// - Progressive event end: <past-tense verb>[<subject>]
export const {
  fetchingTodos, fetchedTodos
} = createActions({
  'FETCHING_TODOS': createActionFunction(messageType),
  'FETCHED_TODOS': createActionFunction(messageType),
});
