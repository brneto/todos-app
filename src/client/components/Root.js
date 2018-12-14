import { hot } from 'react-hot-loader';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import routes from '../libs/routes';
import withHooks from '../hooks/examples/withHooks';
import withoutHooks from '../hooks/examples/withoutHooks';
import App from './App';

const Root = ({ history, store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route {...routes.noHook} component={withoutHooks} />
        <Route {...routes.hook} component={withHooks} />
        <Route {...routes.main} component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default hot(module)(Root);
