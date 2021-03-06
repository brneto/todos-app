import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createRootReduder from '../reducers';
import rootSaga from '../sagas';

const configStore = history => {
  // Recommendation: Put redux-saga last in the middleware call chain.
  const
    sagaMiddleware = createSagaMiddleware(),
    middlewares = [
      routerMiddleware(history),
      sagaMiddleware,
    ];

  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  // Recommendation: Separate the “server data” and the
  // “auxiliary/temporary data” under different root keys.
  const
    rootReducer = createRootReduder(history),
    storeEnhancers = composeWithDevTools(applyMiddleware(...middlewares)),
    store = createStore(rootReducer, storeEnhancers);

  sagaMiddleware.run(rootSaga);
  return store;
};

export default configStore;
