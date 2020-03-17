import React, { StrictMode } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import globalStyle, * as themes from '../libs/style';
import * as routes from '../libs/routes';
import WithHooks from '../hooks/examples/WithHooks';
import WithoutHooks from '../hooks/examples/WithoutHooks';
import App from './App';

const
  propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  },
  // https://medium.com/better-programming/react-router-v6-in-two-minutes-a7a2963e2340
  Root = ({ history, store }) => (
    <ThemeProvider theme={themes.main}>
      <StrictMode>
        <Global style={globalStyle} />
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
Root.propTypes = propTypes;

export default Root;
