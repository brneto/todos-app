import { combineActions, handleActions } from 'redux-actions';
import { flip, prop, identity, merge } from 'ramda';
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
      next: produce((draft, { payload: { entities } }) =>
        merge(draft, entities.todos) //return an entirely new state
      ),
    }
  },
  initialState
);

export default byId;

// SELECTORS
export const createGetTodo = createSelector([flip(prop)], identity);
