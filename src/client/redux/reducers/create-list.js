import { combineReducers } from 'redux';
import { combineActions, handleActions } from 'redux-actions';
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
          throw: always([])
        },
        [documents.todoAdded]: {
          next: produce((draft, { payload, meta }) => {
            if (!isFilter('completed') && isFilter(meta.filter))
              draft.push(payload.result); //modify the current draft state
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

  const fetchStatus = handleActions(
    {
      [events.startedFetch]: produce((draft, { payload }) => {
        if (isFilter(payload)) return 'pending';
      }),
      [events.succeedFetch]: produce((draft, { payload }) => {
        if (isFilter(payload)) return 'resolved';
      }),
      [events.failedFetch]: produce((draft, { payload }) => {
        if (isFilter(payload)) return 'rejected';
      })
    },
    'idle' // Initial state
  );

  const
    { todosFetched, todoAdded, todoToggled } = documents,
    error = handleActions(
      {
        [combineActions(todosFetched, todoAdded, todoToggled)]: {
          //return an entirely new state
          next: always(null),
          throw: produce((draft, { payload, meta }) => isFilter(meta.filter) ? payload : null)
        },
      },
      null // Initial state
    );

  return combineReducers({
    ids,
    fetchStatus,
    error,
  });
};

// SELECTORS
// prop :: s -> {s: a} -> a | Undefined
const
  getIds = createSelector([prop('ids')], identity),
  getFetchStatus = createSelector([prop('fetchStatus')], status => ({
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isResolved: status === 'resolved',
    isRejected: status === 'rejected',
    ...status
  })),
  getError = createSelector([prop('error')], identity);

export {
  createList as default,
  getIds,
  getFetchStatus,
  getError,
};
