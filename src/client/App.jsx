import React, { StrictMode } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import globalStyle, * as themes from './style';
import * as routes from './routes';
import { WithHooks, WithoutHooks, TodoPage } from './scenes';

const
  propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  },
  // https://medium.com/better-programming/react-router-v6-in-two-minutes-a7a2963e2340
  // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/hooks.md
  Root = ({ history, store }) => (
    <ThemeProvider theme={themes.main}>
      <StrictMode>
        <Global styles={globalStyle} />
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route {...routes.noHook} component={WithoutHooks} />
              <Route {...routes.hook} component={WithHooks} />
              <Route {...routes.main} component={TodoPage} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </StrictMode>
    </ThemeProvider>
  );

Root.propTypes = propTypes;

export default hot(Root);
