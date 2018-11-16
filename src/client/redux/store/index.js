import { createBrowserHistory } from 'history';
import configStore from './configStore';

const history = createBrowserHistory();
const store = configStore(history);

export default { history, store };
