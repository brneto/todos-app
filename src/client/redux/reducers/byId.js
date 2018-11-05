import { combineActions, handleActions } from 'redux-actions';
import { flip, prop, identity } from 'ramda';
import { produce } from 'immer';
import { createSelector } from 'reselect';
import { setFetchTodos, setAddTodo, setToggleTodo } from '../actions';

// const byId = (state = {}, { payload }) =>
//   payload?.response
//     ? { ...state, ...payload.response.entities.todos }
//     : state;
const initialState = {};
const byId = handleActions(
  {
    [combineActions(setFetchTodos, setAddTodo, setToggleTodo)]: {
      next: produce((draft, { payload: { entities } }) => {
        Object.assign(draft, entities.todos); //modify the current draft state
      }),
    }
  },
  initialState
);

export default byId;

// SELECTORS
export const createGetTodo = createSelector([flip(prop)], identity);
