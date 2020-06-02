import { combineReducers } from 'redux';
import { connectRouter, createMatchSelector } from 'connected-react-router';
import { createSelector } from 'reselect';
import * as routes from '../../routes';
import byId, * as fromById from './by-id';
import createList, * as fromList from './create-list';
import { identity } from './util';

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
  createMatchSelector({ ...routes.main }),
  matchSelector => matchSelector.params.filter ?? 'all'
  //
);

const getListByFilter = createSelector(
  identity,
  getFilter,
  (state, filter) => state.listByFilter[filter]
);

const getVisibleTodos = createSelector(
  getListByFilter,
  state => fromById.createGetTodo(state.byId),
  (listByFilter, getTodo) => fromList.getIds(listByFilter).map(getTodo)
);

const getFetchStatus = createSelector(
  getListByFilter,
  listByFilter => fromList.getFetchStatus(listByFilter)
);

const getError = createSelector(
  getListByFilter,
  listByFilter => fromList.getError(listByFilter)
);

export {
  createRootReducer as default,
  getFilter,
  getVisibleTodos,
  getFetchStatus,
  getError,
};
