//import '@babel/polyfill';
import chalk from 'chalk';
import morgan from 'morgan';
import compression from 'compression';
import open from 'open';
import express from 'express';
import config from './config.json';
import routers from './server/sseApi/routers';

const env = process.env.NODE_ENV;
const app = express();
const port = config.server.port;
const listenerChecker = error =>
  error
    ? console.log(chalk.red(`Server failed to start: [${error}].`))
    : console.log(
        chalk.green(`Server running and listening on port: ${port}.`)
      ) ||
      (env !== 'production' &&
        open(`http://localhost:${port}`).then(
          resolve => console.log(
            `Browser opened with command: '${resolve.spawnargs.join(' ')}'.`
          ),
          reject => console.log(`Failed to open the browser: [${reject}].`)
        )
      );

console.log(chalk.green('Starting app in', env, 'mode...'));
if (env === 'production') {
  app.use(morgan('tiny'), compression(), express.static(config.client.path));
  app.listen(port, listenerChecker);
} else if (env === 'building') {
    // TODO: Change to use webpack to also transpile the server code.
    // https://github.com/yusinto/universal-hot-reload/blob/master/src/index.js
    // https://webpack.js.org/api/node/#watching
    // https://github.com/liady/webpack-node-externals
  import('./webpack/builder/build.prod');
} else {
  import('./webpack/builder/build.dev').then(async module => {
    const middlewares = await module.default;
    app.use(morgan('combined'), compression(), ...middlewares);

    app.listen(port, listenerChecker);
  });
}
