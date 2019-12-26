import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { prop, identity, equals, always } from 'ramda';
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

  const
    idsInitialState = [],
    ids = handleActions(
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
            const notEquals = a => b => a !== b;
            if(isFilter(meta.filter))
              return draft.filter(notEquals(payload)); //return an entirely new state
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
  const
    isFetchingInitialState = false,
    isFetching = handleActions(
      {
        [setToggleFetching]: produce((draft, { payload }) => {
          if(isFilter(payload))
            return !draft; //return an entirely new state
        }),
      },
      isFetchingInitialState
    );


  const
    getErrorMessage = (test, { message }) => {
      if (test)
        return (message || 'Something went wrong.');
    },
    errorMessageInitialState = null,
    errorMessage = handleActions(
      {
        [setFetchedTodos]: {
          next: always(null),
          throw: produce((draft, { payload, meta }) =>
            getErrorMessage(isFilter(meta.filter), payload) //return an entirely new state
          )
        },
        [setAddedTodo]: {
          next: always(null),
          throw: produce((draft, { payload }) =>
            getErrorMessage(!isFilter('completed'), payload) //return an entirely new state
          )
        },
        [setToggledTodo]: {
          next: always(null),
          throw: produce((state, { payload }) =>
            getErrorMessage(isFilter('all'), payload) //return an entirely new state
          )
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

// SELECTORS
// prop :: s -> {s: a} -> a | Undefined
const
  getIds = createSelector([prop('ids')], identity),
  getIsFetching = createSelector([prop('isFetching')], identity),
  getErrorMessage = createSelector([prop('errorMessage')], identity);

export {
  createList as default,
  getIds,
  getIsFetching,
  getErrorMessage,
};
