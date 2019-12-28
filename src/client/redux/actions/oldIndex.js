import { createActions } from 'redux-actions';
import { identity } from 'ramda';

// TODO: Breaks this file into event types messages
const filterHandler = [identity, (_, filter) => ({ filter })];
// setFetchedTodos :: (a, b) -> {
//   type: 'SET_FETCHED_TODOS',
//   payload: a,
//   meta: { filter: b }
// }
export const {
  // Event messages
  // Naming Convention: ?
  setToggleFetching, // toggleFetching

  // Command(Modifier/Mutator) messages
  // Naming Convention: <imperative verb><subject>
  setToggledTodoAdd, // addTodoToList(['completed'|'active'])
  setToggledTodoRemove, // removeTodoFromList(['completed'|'active'])
} = createActions(
  {
    SET_TOGGLED_TODO_ADD: filterHandler,
    SET_TOGGLED_TODO_REMOVE: filterHandler,
  },
  'SET_TOGGLE_FETCHING',
);
