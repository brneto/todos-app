import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { both, reject, equals, prop, identity, always } from 'ramda';
import { produce } from 'immer';
import { createSelector } from 'reselect';
import {
  setFetchTodos,
  setAddTodo,
  setToggleTodo,

  setToggleFetching,
} from '../actions';

const createList = filter => {
  const isFilter = equals(filter);
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
        next: produce((draft, { payload, meta }) => {
          if(isFilter(meta.filter))
            return payload.result; //return an entirely new state
        }),
      },
      [setAddTodo]: {
        next: produce((draft, { payload }) => {
          if(!isFilter('completed'))
            draft.push(payload.result); //modify the current draft state
        }),
      },
      [setToggleTodo]: {
        next: produce((draft, { payload }) => {
          const { result: toggledId } = payload;
          const { entities: { todos } } = payload;
          const { completed } = todos[toggledId];

          const shouldRemove = both(always(
              (isFilter('active') && completed) ||
              (isFilter('completed') && !completed)
            ),
            equals(toggledId)
          );
          const removeToggledTodo = reject(shouldRemove);

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
      [setToggleFetching]: produce((draft, { meta }) => {
        if(isFilter(meta.filter))
          return !draft; //return an entirely new state
      }),
    },
    isFetchingInitialState
  );

  const getErrorMessage = ({ message }) => (message || 'Something went wrong.');
  const errorMessageInitialState = null;
  const errorMessage = handleActions(
    {
      [setFetchTodos]: {
        next: produce(always(null)),
        throw: produce((draft, { payload, meta }) => {
          if(isFilter(meta.filter))
            return getErrorMessage(payload); //return an entirely new state
        })
      },
      [setAddTodo]: {
        next: produce(always(null)),
        throw: produce((draft, { payload }) => {
          if(!isFilter('completed'))
            return getErrorMessage(payload); //return an entirely new state
        })
      },
      [setToggleTodo]: {
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
