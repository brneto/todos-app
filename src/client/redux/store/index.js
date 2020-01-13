import { createBrowserHistory } from 'history';
import configStore from './config-store';

const
  history = createBrowserHistory(),
  store = configStore(history);

export { history, store };
