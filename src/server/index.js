import chalk from 'chalk';
import * as server from './config';
import * as routers from './routers';
import models from './models';

const
  port = server.port,
  clientDir = server.path,
  red = chalk.red,
  green = chalk.green,
  listenerHandler = error =>
    error
      ? console.log(red(`Server failed to start: [${error}].`))
      : console.log(green(`Server running and listening on port: ${port}.`)),
  { createSpa, ...rest } = routers;

function listen(app) {
  app.use(models);
  app.use('/api', ...Object.values(rest));

  app.listen(port, listenerHandler);
}

export {
  listen,
  createSpa,
  clientDir,
};
