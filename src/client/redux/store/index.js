import { createBrowserHistory } from 'history';
import configStore from './config-store';

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/hooks.md
const
  history = createBrowserHistory(),
  store = configStore(history);

export { history, store };
