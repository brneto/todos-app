import { createBrowserHistory } from 'history';
import configStore from './configStore';

const
  history = createBrowserHistory(),
  store = configStore(history);

export { history, store };
