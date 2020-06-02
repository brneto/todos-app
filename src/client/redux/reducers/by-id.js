import { combineActions, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { createSelector } from 'reselect';
import { documents } from '../actions';
import { identity } from './util';

const
  { todosFetched, todoAdded, todoToggled } = documents,
  byId = handleActions(
    {
      [combineActions(todosFetched, todoAdded, todoToggled)]: {
        next: produce((draft, { payload: { entities } }) => {
          Object.assign(draft, entities.todos); //modify the current draft state
        }),
      }
    },
    {} // Initial state
  );

// SELECTORS
const createGetTodo = createSelector(
  identity,
  state => id => state[id]
);

export {
  byId as default,
  createGetTodo,
};
