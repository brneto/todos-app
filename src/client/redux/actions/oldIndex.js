import { createActions } from 'redux-actions';

// TODO: Breaks this file into event types messages
export const {
  // Event messages
  // Naming Convention: ?
  setToggleFetching, // toggleFetching
} = createActions(
  'SET_TOGGLE_FETCHING',
);
