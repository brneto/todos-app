import throttle from 'lodash/throttle';
import { loadState, saveState } from './local-storage';

const customMiddleware = () => next => action => {
  // Custom middleware implementation
  next(action);
};

const promiseMiddleware = store => next => action => {
  typeof action.then === 'function'
    ? action.then(store.dispatch)
    : next(action);
};

const thunkMiddleware = store => next => action => {
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action);
};

const localStorageMiddleware = () => next => action => {
  const initialState = loadState();
  const store = next(action, initialState);

  store.subscribe(
    throttle(() => saveState({ todos: store.getState().todos })),
    1000
  );

  return store;
};

export {
  customMiddleware,
  promiseMiddleware,
  thunkMiddleware,
  localStorageMiddleware,
};
