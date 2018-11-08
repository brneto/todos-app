import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reject, equals, prop, identity, always } from 'ramda';
import { produce } from 'immer';
import { createSelector } from 'reselect';
import {
  setFetchedTodos,
  setAddedTodo,

  setToggledTodo,
  setToggledTodoAdd,
  setToggledTodoRemove,

  setToggleFetching,
} from '../actions';

const createList = filter => {
  const isFilter = equals(filter);

  const idsInitialState = [];
  const ids = handleActions(
    {
      [setFetchedTodos]: {
        next: produce((draft, { payload, meta }) => {
          if(isFilter(meta.filter))
            return payload.result; //return an entirely new state
        }),
      },
      [setAddedTodo]: {
        next: produce((draft, { payload }) => {
          if(!isFilter('completed'))
            draft.push(payload.result); //modify the current draft state
        }),
      },
      [setToggledTodoAdd]: {
        next: produce((draft, { payload, meta }) => {
          if(isFilter(meta.filter))
            draft.push(payload); //modify the current draft state
        }),
      },
      [setToggledTodoRemove]: {
        next: produce((draft, { payload, meta }) => {
          if(isFilter(meta.filter))
            return reject(equals(payload), draft); //return an entirely new state
        }),
      },
    },
    idsInitialState
  );

  // const isFetching = (state = false, { type, meta }) => {
  //   if (filter !== meta?.filter) {
  //     return state;
  //   }
  //   switch (type) {
  //     case 'FETCH_TODOS_REQUEST':
  //       return true;
  //     case 'FETCH_TODOS_SUCCESS':
  //     case 'FETCH_TODOS_FAILURE':
  //       return false;
  //     default:
  //       return state;
  //   }
  // };
  // To reproduce the same above behavior one solution would use
  // the filter test to set diferents handleActions to isFetching state.
  const isFetchingInitialState = false;
  const isFetching = handleActions(
    {
      [setToggleFetching]: produce((draft, { payload }) => {
        if(isFilter(payload))
          return !draft; //return an entirely new state
      }),
    },
    isFetchingInitialState
  );

  const getErrorMessage = ({ message }) => (message || 'Something went wrong.');
  const errorMessageInitialState = null;
  const errorMessage = handleActions(
    {
      [setFetchedTodos]: {
        next: produce(always(null)),
        throw: produce((draft, { payload, meta }) => {
          if(isFilter(meta.filter))
            return getErrorMessage(payload); //return an entirely new state
        })
      },
      [setAddedTodo]: {
        next: produce(always(null)),
        throw: produce((draft, { payload }) => {
          if(!isFilter('completed'))
            return getErrorMessage(payload); //return an entirely new state
        })
      },
      [setToggledTodo]: {
        next: produce(always(null)),
        throw: produce((draft, { payload }) => {
          if(isFilter('all'))
            return getErrorMessage(payload); //return an entirely new state
        })
      },
    },
    errorMessageInitialState
  );

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
};

export default createList;

// SELECTORS
// prop :: s -> {s: a} -> a | Undefined
export const getIds = createSelector([prop('ids')], identity);
export const getIsFetching = createSelector([prop('isFetching')], identity);
export const getErrorMessage = createSelector([prop('errorMessage')], identity);
