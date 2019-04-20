import { combineReducers } from 'redux';
import { map, compose, o, prop, defaultTo, identity, juxt, apply } from 'ramda';
import { connectRouter, createMatchSelector } from 'connected-react-router';
import { createSelector } from 'reselect';
import * as routes from '../../libs/routes';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

// Recommendation: The reducer function is always default export.
const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  byId,
  listByFilter,
});

// Recommendation: Always put the selectors together with its related reducer.
const getFilter = createSelector(
  // createMatchSelector:
  // The argument are the props to match against,
  // they are identical to the matching props Route accepts:
  // {
  //   path, // like /:filter?
  //   strict, // optional, defaults to false
  //   exact // optional, defaults to false
  // }
  [createMatchSelector({ ...routes.main })],
  compose(defaultTo('all'), prop('filter'), prop('params'))
);

const getListByFilter = createSelector(
  [o(apply(prop), juxt([getFilter, prop('listByFilter')]))],
  identity
);

const getVisibleTodos = createSelector(
  [
    o(fromById.createGetTodo, prop('byId')),
    o(fromList.getIds, getListByFilter),
  ],
  map
);

const getIsFetching = createSelector(
  [o(fromList.getIsFetching, getListByFilter)],
  identity
);

const getErrorMessage = createSelector(
  [o(fromList.getErrorMessage, getListByFilter)],
  identity
);

export {
  createRootReducer as default,
  getFilter,
  getVisibleTodos,
  getIsFetching,
  getErrorMessage,
};
