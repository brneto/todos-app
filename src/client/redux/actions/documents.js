import { createActions } from 'redux-actions';
import { identity } from 'ramda';

// fetchedTodos :: (a, b) -> {
//   type: 'FETCHED_TODOS',
//   payload: a,
//   meta: { filter: b }
// }

// Document actions
// Naming Convention: <past-tense verb><subject>
export const {
  fetchedTodos,
  addedTodo,
  toggledTodo,
} = createActions(
  { FETCHED_TODOS: [identity, (payload, filter) => ({ filter })] },
  'ADDED_TODO',
  'TOGGLED_TODO',
);
