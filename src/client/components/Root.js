import React, { StrictMode } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import GlobalStyle, * as themes from '../libs/style';
import * as routes from '../libs/routes';
import WithHooks from '../hooks/examples/WithHooks';
import WithoutHooks from '../hooks/examples/WithoutHooks';
import App from './App';

const Root = ({ history, store }) => (
  <ThemeProvider theme={themes.main}>
    <StrictMode>
      <GlobalStyle />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route {...routes.noHook} component={WithoutHooks} />
            <Route {...routes.hook} component={WithHooks} />
            <Route {...routes.main} component={App} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </StrictMode>
  </ThemeProvider>
);
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default hot(Root);
