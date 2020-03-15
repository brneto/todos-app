import { createActions } from 'redux-actions';
import { createActionFunction } from './functions';

const
  messageType = 'EVENT',
  actionFunction = createActionFunction(messageType);

// Event actions
// Naming Convention:
// - Instant event: <present-tense verb>
// - Progressive event start: <present-continuous verb>[<subject>]
// - Progressive event end: <past-tense verb>[<subject>]
export const {
  fetchStart, fetchSuccess, fetchFail,
  fetchingTodos, fetchedTodos
} = createActions({
  'FETCH_START': actionFunction,
  'FETCH_SUCCESS': actionFunction,
  'FETCH_FAIL': actionFunction,

  'FETCHING_TODOS': actionFunction,
  'FETCHED_TODOS': actionFunction,
});
