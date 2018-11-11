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
        next: (state, { payload, meta }) => when(
          always(isFilter(meta.filter)),
          always(payload.result) //return an entirely new state
        )(state),
      },
      [setAddedTodo]: {
        next: (state, { payload }) => when(
          always(!isFilter('completed')),
          append(payload.result)
        )(state),
      },
      [setToggledTodoAdd]: {
        next: (state, { payload, meta }) => when(
          always(isFilter(meta.filter)),
          append(payload) //return an entirely new state
        )(state),
      },
      [setToggledTodoRemove]: {
        next: (state, { payload, meta }) => when(
          always(isFilter(meta.filter)),
          reject(equals(payload)) //return an entirely new state
        )(state),
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
      [setToggleFetching]: (state, { payload }) => when(
        always(isFilter(payload)),
        not
      )(state), //return an entirely new state
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
        throw: (state, { payload, meta }) =>
          getErrorMessage(isFilter(meta.filter), state, payload)
      },
      [setAddedTodo]: {
        next: always(null),
        throw: (state, { payload }) =>
          getErrorMessage(!isFilter('completed'), state, payload)
      },
      [setToggledTodo]: {
        next: always(null),
        throw: (state, { payload }) =>
          getErrorMessage(isFilter('all'), state, payload)
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
