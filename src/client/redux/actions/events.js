import { createActions } from 'redux-actions';
import { createActionFunction } from './functions';

const actionFunction = createActionFunction('EVENT');

// Event actions
// Naming Convention:
// - Instant event: <present-tense verb>
// - Progressive event: <past-tense verb>[<subject>]
export const {
  startedFetch, succeedFetch, failedFetch,
} = createActions({
  'STARTED_FETCH': actionFunction,
  'SUCCEED_FETCH': actionFunction,
  'FAILED_FETCH': actionFunction,
});
