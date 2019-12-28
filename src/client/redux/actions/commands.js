import { createActions } from 'redux-actions';
import { identity } from 'ramda';

// addToggledTodoToList :: (a, b) -> {
//   type: 'ADD_TOGGLED_TODO_TO_LIST',
//   payload: a,
//   meta: { id: b }
// }
const listHandler = [identity, (payload, id) => ({ id })];

// Pure Command actions
// Naming Convention: <imperative verb><subject>
export const {
  addToggledTodoToList,
  removeToggledTodoFromList,
} = createActions({
  ADD_TOGGLED_TODO_TO_LIST: listHandler,
  REMOVE_TOGGLED_TODO_FROM_LIST: listHandler,
});
