import { combineReducers } from 'redux';
import { createMatchSelector } from 'connected-react-router';
import { createSelector } from 'reselect';
import routes from '../../libs/routes';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const todos = combineReducers({
  byId,
  listByFilter,
});

// Recommendation: The reducer function is always default export.
export default todos;

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
  [state => createMatchSelector({ ...routes.main })(state)],
  match => match.params.filter || 'all'
);

const getListByFilter = createSelector(
  [state => state.listByFilter[getFilter(state)]],
  list => list
);

export const getVisibleTodos = createSelector(
  [
    state => fromList.getIds(getListByFilter(state)),
    state => fromById.createGetTodo(state.byId),
  ],
  (ids, getTodo) => ids.map(getTodo)
);

export const getIsFetching = createSelector(
  [state => fromList.getIsFetching(getListByFilter(state))],
  isFetching => isFetching
);

export const getErrorMessage = createSelector(
  [state => fromList.getErrorMessage(getListByFilter(state))],
  errorMessage => errorMessage
);
