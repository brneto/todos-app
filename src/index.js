import chalk from 'chalk';
import compression from 'compression';
import express from 'express';
import * as server from './server';

const target = process.env.NODE_ENV ?? 'development';

console.log(chalk.green('Starting app in', target, 'mode...'));
if (target === 'production') {
  let app = express();
  app.use(compression(), express.static(server.clientDir));
  server.listen(app);
} else {
  import('./webpack/builder').then(async module => {
    const build = module.default;
    build(target);
  });
}

