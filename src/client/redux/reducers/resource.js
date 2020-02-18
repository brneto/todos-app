import { handleActions } from 'redux-actions';
import { prop, identity } from 'ramda';
import { produce } from 'immer';
import { createSelector } from 'reselect';
import * as api from '../../api';
import { commands } from '../actions';

const resource = handleActions(
  {
    [commands.createResource]: {
      next: produce((draft, { payload: filter }) =>
        api.todos.fetchTodos(filter) |> api.createResource), //return an entirely new state
    }
  }, null // Initial state
);

// SELECTORS
// prop :: s -> {s: a} -> a | Undefined
const getResource = createSelector([prop('resource')], identity);

export {
  resource as default,
  getResource,
};
