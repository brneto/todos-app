import chalk from 'chalk';
import open from 'open';
import config from '../config.json';

const env = process.env.NODE_ENV;
const port = config.server.port;

const listenerHandler = error =>
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

export default {
  listenerHandler,
};
