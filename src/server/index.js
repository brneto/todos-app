import chalk from 'chalk';
import open from 'open';
import * as server from './config';
import * as routers from './routers';
import models from './models';

const
  isInDev = process.env.NODE_ENV !== 'production',
  port = server.port,
  clientDir = server.path,
  red = chalk.red,
  green = chalk.green,
  listenerHandler = error =>
    error
      ? console.log(red(`Server failed to start: [${error}].`))
      : console.log(green(`Server running and listening on port: ${port}.`))
        || (isInDev &&
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
  clientDir,
};
