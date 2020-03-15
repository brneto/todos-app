import { combineReducers } from 'redux';
import { map, compose, o, prop, defaultTo, identity, juxt, apply } from 'ramda';
import { connectRouter, createMatchSelector } from 'connected-react-router';
import { createSelector } from 'reselect';
import * as routes from '../../libs/routes';
import byId, * as fromById from './by-id';
import createList, * as fromList from './create-list';

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
  // The argument are the props to match against.
  // They are identical to the matching props Route accepts:
  // {
  //   path, // like /:filter?
  //   strict, // optional, defaults to false
  //   exact // optional, defaults to false
  // }
  [createMatchSelector({ ...routes.main })],
  compose(defaultTo('all'), prop('filter'), prop('params'))
  //
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

const getFetchStatus = createSelector(
  [o(fromList.getFetchStatus, getListByFilter)],
  identity
);

const getError = createSelector(
  [o(fromList.getError, getListByFilter)],
  identity
);

export {
  createRootReducer as default,
  getFilter,
  getVisibleTodos,
  getFetchStatus,
  getError,
};
