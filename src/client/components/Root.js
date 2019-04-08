import React from 'react';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'styled-components';
import { PropTypes } from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import GlobalStyle, * as themes from '../libs/style';
import routes from '../libs/routes';
import withHooks from '../hooks/examples/withHooks';
import withoutHooks from '../hooks/examples/withoutHooks';
import App from './App';

const Root = ({ history, store }) => (
  <ThemeProvider theme={themes.main}>
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route {...routes.noHook} component={withoutHooks} />
            <Route {...routes.hook} component={withHooks} />
            <Route {...routes.main} component={App} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </>
  </ThemeProvider>
);
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default hot(Root);
