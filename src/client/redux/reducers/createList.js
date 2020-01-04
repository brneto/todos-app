import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { prop, identity, equals, always } from 'ramda';
import { produce } from 'immer';
import { createSelector } from 'reselect';
import { commands, events, documents } from '../actions';

const createList = filter => {
  const isFilter = equals(filter);

  const ids = handleActions(
      {
        [documents.todosFetched]: {
          next: produce((draft, { payload, meta }) => {
            if (isFilter(meta.filter)) return payload.result; //return an entirely new state
          }),
        },
        [documents.todoAdded]: {
          next: produce((draft, { payload }) => {
            if (!isFilter('completed')) draft.push(payload.result); //modify the current draft state
          }),
        },
        [commands.addTodoToList]: {
          next: produce((draft, { payload, meta }) => {
            if (isFilter(meta.filter)) draft.push(payload.result); //modify the current draft state
          }),
        },
        [commands.removeTodoFromList]: {
          next: produce((draft, { payload, meta }) => {
            const notEquals = a => b => a !== b;
            if(isFilter(meta.filter)) return draft.filter(notEquals(payload.result)); //return an entirely new state
          }),
        },
      },
      [] // Initial state
    );

  const isFetching = handleActions(
      {
        [events.fetchingTodos]: produce((draft, { payload }) => {
          if (isFilter(payload)) return true; //return an entirely new state
        }),
        [events.fetchedTodos]: produce((draft, { payload }) => {
          if (isFilter(payload)) return false;
        }),
      },
      false // Initial state
    );

  const
    returnIf = test => payload => {
      if (test) return payload;
    },
    error = handleActions(
      {
        [documents.todosFetched]: {
          //return an entirely new state
          next: always(null),
          throw: produce((draft, { payload, meta }) => payload |> returnIf(isFilter(meta.filter)))
        },
        [documents.todoAdded]: {
          //return an entirely new state
          next: always(null),
          throw: produce((draft, { payload }) => payload |> returnIf(!isFilter('completed')))
        },
        [documents.todoToggled]: {
          //return an entirely new state
          next: always(null),
          throw: produce((draft, { payload }) => payload)
        },
      },
      null // Initial state
    );

  return combineReducers({
    ids,
    isFetching,
    error,
  });
};

// SELECTORS
// prop :: s -> {s: a} -> a | Undefined
const
  getIds = createSelector([prop('ids')], identity),
  getIsFetching = createSelector([prop('isFetching')], identity),
  getError = createSelector([prop('error')], identity);

export {
  createList as default,
  getIds,
  getIsFetching,
  getError,
};
