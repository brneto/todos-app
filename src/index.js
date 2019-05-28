//import '@babel/polyfill';
import chalk from 'chalk';
import morgan from 'morgan';
import compression from 'compression';
import express from 'express';
import * as server from './server';

const
  env = process.env.NODE_ENV,
  app = express();

console.log(chalk.green('Starting app in', env, 'mode...'));
switch (env) {
  case 'production':
    app.use(morgan('common'), compression(), express.static(server.clientDir));
    server.listen(app);
    break;

  case 'building':
    // TODO: Change to use webpack to also transpile the server code.
    // https://github.com/yusinto/universal-hot-reload/blob/master/src/index.js
    // https://webpack.js.org/api/node/#watching
    // https://github.com/liady/webpack-node-externals
    import('./webpack/builders/build.prod');
    break;

  default:
    import('./webpack/builders/build.dev').then(async module => {
      const build = await module.default;

      app.use(morgan('combined'), compression(), build.router);
      app.use(server.createSpa(build.resourceBuffer));
      server.listen(app);
    });
}
