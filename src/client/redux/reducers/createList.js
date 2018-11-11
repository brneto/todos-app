import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  reject,
  append,
  prop,
  identity,
  always,
  equals,
  when,
  not
} from 'ramda';
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
        next: (draft, { payload, meta }) => when(
          always(isFilter(meta.filter)),
          always(payload.result) //return an entirely new state
        )(draft),
      },
      [setAddedTodo]: {
        next: (draft, { payload }) => when(
          always(!isFilter('completed')),
          append(payload.result)
        )(draft),
      },
      [setToggledTodoAdd]: {
        next: (draft, { payload, meta }) => when(
          always(isFilter(meta.filter)),
          append(payload) //return an entirely new state
        )(draft),
      },
      [setToggledTodoRemove]: {
        next: (draft, { payload, meta }) => when(
          always(isFilter(meta.filter)),
          reject(equals(payload)) //return an entirely new state
        )(draft),
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
      [setToggleFetching]: (draft, { payload }) => when(
        always(isFilter(payload)),
        not
      )(draft), //return an entirely new state
    },
    isFetchingInitialState
  );


  const getErrorMessage = (test, state, { message }) =>
    when(
      always(test),
      always(message || 'Something went wrong.')
    )(state);
  const errorMessageInitialState = null;
  const errorMessage = handleActions(
    {
      [setFetchedTodos]: {
        next: always(null),
        throw: (draft, { payload, meta }) =>
          getErrorMessage(isFilter(meta.filter), draft, payload)
      },
      [setAddedTodo]: {
        next: always(null),
        throw: (draft, { payload }) =>
          getErrorMessage(!isFilter('completed'), draft, payload)
      },
      [setToggledTodo]: {
        next: always(null),
        throw: (draft, { payload }) =>
          getErrorMessage(isFilter('all'), draft, payload)
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
