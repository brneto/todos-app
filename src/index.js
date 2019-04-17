//import '@babel/polyfill';
import chalk from 'chalk';
import morgan from 'morgan';
import compression from 'compression';
import express from 'express';
import utils from './server/utils';
import config from './config.json';

const env = process.env.NODE_ENV;
const app = express();
const port = config.server.port;
const listenerHandler = utils.listenerHandler;

console.log(chalk.green('Starting app in', env, 'mode...'));
switch (env) {
  case 'production':
    app.use(morgan('tiny'), compression(), express.static(config.client.path));
    app.listen(port, listenerHandler);
    break;

  case 'building':
    // TODO: Change to use webpack to also transpile the server code.
    // https://github.com/yusinto/universal-hot-reload/blob/master/src/index.js
    // https://webpack.js.org/api/node/#watching
    // https://github.com/liady/webpack-node-externals
    import('./webpack/builder/build.prod');
    break;

  default:
    import('./webpack/builder/build.dev').then(async module => {
      const webpack = await module.default;
      app.use(morgan('combined'), compression(), ...webpack);
      app.listen(port, listenerHandler);
    });
}
