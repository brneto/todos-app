import { combineActions, handleActions } from 'redux-actions';
import { flip, prop, identity, merge } from 'ramda';
import { createSelector } from 'reselect';
import { setFetchedTodos, setAddedTodo, setToggledTodo } from '../actions';

// const byId = (state = {}, { payload }) =>
//   payload?.response
//     ? { ...state, ...payload.response.entities.todos }
//     : state;
const initialState = {};
const byId = handleActions(
  {
    [combineActions(setFetchedTodos, setAddedTodo, setToggledTodo)]: {
      next: (state, { payload: { entities } }) => merge(state, entities.todos),
    }
  },
  initialState
);

export default byId;

// SELECTORS
// flip(prop) :: {s: a} -> s -> a | Undefined
export const createGetTodo = createSelector([flip(prop)], identity);
