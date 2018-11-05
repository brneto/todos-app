import { combineReducers } from 'redux';
import { map, compose, prop, identity } from 'ramda';
import { connectRouter, createMatchSelector } from 'connected-react-router';
import { createSelector } from 'reselect';
import routes from '../../libs/routes';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  byId,
  listByFilter,
});

// Recommendation: The reducer function is always default export.
export default createRootReducer;

// Recommendation: Always put the selectors together with its related reducer.
export const getFilter = createSelector(
  // createMatchSelector:
  // The argument are the props to match against,
  // they are identical to the matching props Route accepts:
  // {
  //   path, // like /:filter?
  //   strict, // optional, defaults to false
  //   exact // optional, defaults to false
  // }
  [createMatchSelector({ ...routes.main })],
  match => match.params.filter || 'all'
);

const getListByFilter = createSelector(
  [state => state.listByFilter[getFilter(state)]],
  identity
);

export const getVisibleTodos = createSelector(
  [
    compose(fromById.createGetTodo, prop('byId')),
    compose(fromList.getIds, getListByFilter),
  ],
  map
);

export const getIsFetching = createSelector(
  [compose(fromList.getIsFetching, getListByFilter)],
  identity
);

export const getErrorMessage = createSelector(
  [compose(fromList.getErrorMessage, getListByFilter)],
  identity
);
