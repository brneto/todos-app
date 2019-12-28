import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { prop, identity, equals, always } from 'ramda';
import { produce } from 'immer';
import { createSelector } from 'reselect';
import {
  setToggledTodoAdd,
  setToggledTodoRemove,

  setToggleFetching,
} from '../actions/oldIndex';
import { documents } from '../actions';

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
        [setToggledTodoAdd]: { // Command action
          next: produce((draft, { payload, meta }) => {
            if (isFilter(meta.filter)) draft.push(payload); //modify the current draft state
          }),
        },
        [setToggledTodoRemove]: { // Command action
          next: produce((draft, { payload, meta }) => {
            const notEquals = a => b => a !== b;
            if(isFilter(meta.filter)) return draft.filter(notEquals(payload)); //return an entirely new state
          }),
        },
      },
      [] // Initial state
    );

  const isFetching = handleActions(
      {
        [setToggleFetching]: produce((draft, { payload }) => { // Event action
          if (isFilter(payload)) return !draft; //return an entirely new state
        }),
      },
      false // Initial state
    );

  const
    getErrorMessage = (test, { message }) => {
      if (test) return (message || 'Something went wrong.');
    },
    errorMessage = handleActions(
      {
        [documents.todosFetched]: {
          next: always(null),
          throw: produce((draft, { payload, meta }) =>
            getErrorMessage(isFilter(meta.filter), payload) //return an entirely new state
          )
        },
        [documents.todoAdded]: {
          next: always(null),
          throw: produce((draft, { payload }) =>
            getErrorMessage(!isFilter('completed'), payload) //return an entirely new state
          )
        },
        [documents.todoToggled]: {
          next: always(null),
          throw: produce((state, { payload }) =>
            getErrorMessage(isFilter('all'), payload) //return an entirely new state
          )
        },
      },
      null // Initial state
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
