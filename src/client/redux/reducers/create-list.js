import { combineReducers } from 'redux';
import { combineActions, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { createSelector } from 'reselect';
import { commands, events, documents } from '../actions';
import { identity } from './util';

const always = value => () => value;

const createList = filter => {
  const isFilter = value => filter === value;

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
const
  getIds = createSelector(
    identity,
    state => state.ids
  ),
  getFetchStatus = createSelector(
    state => state.fetchStatus,
    status => ({
      isIdle: status === 'idle',
      isLoading: status === 'pending',
      isResolved: status === 'resolved',
      isRejected: status === 'rejected',
      ...status
    })
  ),
  getError = createSelector(
    identity,
    state => state.error
  );

export {
  createList as default,
  getIds,
  getFetchStatus,
  getError,
};
