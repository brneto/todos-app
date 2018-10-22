import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';

export const sampleMiddleware = () => next => action => {
  // TODO: Implement the middleware

  next(action);
};

export const promiseMiddleware = store => next => action => {
  typeof action.then === 'function'
    ? action.then(store.dispatch)
    : next(action);
};

export const thunkMiddleware = store => next => action => {
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action);
};

export const localStorageMiddleware = () => next => action => {
  const initialState = loadState();
  const store = next(action, initialState);

  store.subscribe(throttle(() =>
    saveState({
      todos: store.getState().todos
    })
  ), 1000);

  return store;
};
