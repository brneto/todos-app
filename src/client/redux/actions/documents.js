import { createActions } from 'redux-actions';
import { identity } from 'ramda';

// todosFetched :: (a, b) -> {
//   type: 'FETCHED_TODOS',
//   payload: a,
//   meta: { filter: b }
// }

// Document actions
// Naming Convention: <subject><past-tense verb>
export const {
  todosFetched,
  todoAdded,
  todoToggled,
} = createActions(
  { TODOS_FETCHED: [identity, (payload, filter) => ({ filter })] },
  'TODO_ADDED',
  'TODO_TOGGLED',
);
