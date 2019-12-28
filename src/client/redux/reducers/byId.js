import { combineActions, handleActions } from 'redux-actions';
import { flip, prop, identity } from 'ramda';
import { produce } from 'immer';
import { createSelector } from 'reselect';
import { documents } from '../actions/nextIndex';

const { todosFetched, todoAdded, todoToggled } = documents;
const byId = handleActions(
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
// flip(prop) :: {s: a} -> s -> a | Undefined
const createGetTodo = createSelector([flip(prop)], identity);

export {
  byId as default,
  createGetTodo,
};
