import chalk from 'chalk';
import open from 'open';
import config from '../config.json';
import models from './models';
import * as routers from './routers';

const
  isInDev = process.env.NODE_ENV !== 'production',
  port = config.server.port,
  listenerHandler = error =>
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
        ),
  { createSpa, ...rest } = routers;

function listen(app) {
  app.use(models);
  app.use('/api', ...Object.values(rest));

  app.listen(port, listenerHandler);
}

export {
  listen,
  createSpa,
};
