import { combineActions, handleActions } from 'redux-actions';
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
        Object.assign(draft, entities.todos) //modify the current state
      ),
    }
  },
  initialState
);

export default byId;

// SELECTORS
export const createGetTodo = createSelector(
  [state => id => state[id]],
  getTodo => getTodo
);
