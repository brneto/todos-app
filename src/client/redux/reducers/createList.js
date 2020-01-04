import { combineReducers } from 'redux';
import { combineActions, handleActions } from 'redux-actions';
import { prop, identity, equals, always } from 'ramda';
import { produce } from 'immer';
import { createSelector } from 'reselect';
import { events, documents } from '../actions';

const createList = filter => {
  const isFilter = equals(filter);

  const ids = handleActions(
      {
        [documents.todosFetched]: {
          next: produce((draft, { payload, meta }) =>
            isFilter(meta.filter) ? payload.result : [] //return an entirely new state
          ),
          throw: always([])
        },
        [documents.todoAdded]: {
          next: produce((draft, { payload, meta }) => {
            if (!isFilter('completed') && isFilter(meta.filter))
              draft.push(payload.result); //modify the current draft state
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
          if (isFilter(payload)) return false; //return an entirely new state
        }),
      },
      false // Initial state
    );

  const
    { todosFetched, todoAdded, todoToggled } = documents,
    error = handleActions(
      {
        [combineActions(todosFetched, todoAdded, todoToggled)]: {
          next: always(null),
          throw: produce((draft, { payload, meta }) =>
            isFilter(meta.filter) ? payload : null //return an entirely new state
          )
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
