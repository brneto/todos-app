import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { curry, compose, reject, equals } from 'ramda';
import { produce } from 'immer';
import { createSelector } from 'reselect';
import {
  setFetchTodos,
  setAddTodo,
  setToggleTodo,

  setToggleFetching,
} from '../actions';

const createList = filter => {
  const isFilter = value => filter === value;
  // const ids = (state = [], { type, payload, meta }) => {
  //   switch (type) {
  //     case 'FETCH_TODOS_SUCCESS':
  //       return filter === meta.filter ? payload.response.result : state;
  //     case 'ADD_TODO_SUCCESS':
  //       return filter !== 'completed'
  //       ? [...state, payload.response.result]
  //       : state;
  //     case 'TOGGLE_TODO_SUCCESS':
  //       return handleToggleTodo(state, payload);
  //     default:
  //       return state;
  //   }
  // };
  const idsInitialState = [];
  const ids = handleActions(
    {
      [setFetchTodos]: {
        next: produce((draft, { payload, meta }) =>
          isFilter(meta.filter) ? payload.result : void 0 //return an entirely new state
        ),
      },
      [setAddTodo]: {
        next: produce((draft, { payload }) => {
          !isFilter('completed') && draft.push(payload.result); //modify the current state
        }),
      },
      [setToggleTodo]: {
        next: produce((draft, { payload }) => {
          const { result: toggledId } = payload;
          const { entities: { todos } } = payload;
          const { completed } = todos[toggledId];
          const shouldRemove = curry(
            (a, b) => equals(a, b) && (
              (isFilter('active') && completed) ||
              (isFilter('completed') && !completed)
            )
          );
          const createRemoveTodo = compose(reject, shouldRemove);
          const removeToggledTodo = createRemoveTodo(toggledId);

          return removeToggledTodo(draft); //return an entirely new state
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
      [setToggleFetching]: produce((draft, { meta }) =>
        isFilter(meta.filter) ? !draft : void 0 //return an entirely new state
      ),
    },
    isFetchingInitialState
  );

  // const errorMessage = (state = null, { type, payload, meta }) => {
  //   if (filter !== meta?.filter) {
  //     return state;
  //   }
  //   switch (type) {
  //     case 'FETCH_TODOS_FAILURE':
  //       return payload.message;
  //     case 'FETCH_TODOS_REQUEST':
  //     case 'FETCH_TODOS_SUCCESS':
  //       return null;
  //     default:
  //       return state;
  //   }
  // };
  const getErrorMessage = (test, { message }) =>
    test ? (message || 'Something went wrong.') : void 0;

  const errorMessageInitialState = null;
  const errorMessage = handleActions(
    {
      [setFetchTodos]: {
        next: produce(() => null),
        throw: produce((draft, { payload, meta }) =>
          getErrorMessage(isFilter(meta.filter), payload) //return an entirely new state
        )
      },
      [setAddTodo]: {
        next: produce(() => null),
        throw: produce((draft, { payload }) =>
          getErrorMessage(!isFilter('completed'), payload) //return an entirely new state
        )
      },
      [setToggleTodo]: {
        next: produce(() => null),
        throw: produce((draft, { payload }) =>
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

export default createList;

// SELECTORS
export const getIds = createSelector(
  [state => state.ids],
  ids => ids
);
export const getIsFetching = createSelector(
  [state => state.isFetching],
  isFetching => isFetching
);
export const getErrorMessage = createSelector(
  [state => state.errorMessage],
  errorMessage => errorMessage
);
