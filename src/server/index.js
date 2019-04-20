import chalk from 'chalk';
import express from 'express';
import open from 'open';
import config from '../config.json';
import models from './models';
import * as routers from './routers';

const isInDev = process.env.NODE_ENV !== 'production';
const port = config.server.port;

const listenerHandler = error =>
  error
    ? console.log(chalk.red(`Server failed to start: [${error}].`))
    : console.log(
        chalk.green(`Server running and listening on port: ${port}.`)
      ) ||
      (isInDev &&
        open(`http://localhost:${port}`).then(
          resolve =>
            console.log(
              `Browser opened with command: '${resolve.spawnargs.join(' ')}'.`
            ),
          reject => console.log(`Failed to open the browser: [${reject}].`)
        )
      );

const listen = app => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(models);

  app.use('/api/todos', routers.restful);
  app.use('/api/sse', routers.sse);

  app.listen(port, listenerHandler);
};

export default {
  listen,
  createSpa: routers.createSpa,
};
