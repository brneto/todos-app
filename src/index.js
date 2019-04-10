//https://github.com/glenjamin/ultimate-hot-reloading-example/blob/master/server.js
//import '@babel/polyfill';
import chokidar from 'chokidar';
import chalk from 'chalk';
import morgan from 'morgan';
import compression from 'compression';
import open from 'open';
import express from 'express';
import webpackBuilder from './webpack';

const port = 3000;
const app = express();

console.log(chalk.green(`Starting app in ${process.env.NODE_ENV} mode...`));

webpackBuilder().then(async middlewares => {
  app.use(morgan('combined'), compression(), ...(await middlewares));

  // TODO: Test whether the server hot-reloading it's really working.
  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  const watcher = chokidar.watch('./src/server');
  watcher.on('ready', () => {
    watcher.on('all', () => {
      Object.keys(require.cache).forEach(
        id => /[/\\]server[/\\]/.test(id) && delete require.cache[id]
      );
      console.log(chalk.yellow('"server" module cache cleared'));
    });
  });

  app.listen(port, error =>
    error
      ? console.log(chalk.red(`Server failed to start: [${error}].`))
      : console.log(chalk.green(`Server running and listening on port: ${port}.`)) ||
        open(`http://localhost:${port}`).then(
          resolve => console.log(
            `Browser opened with command: '${resolve.spawnargs.join(' ')}'.`
          ),
          reject => console.log(`Failed to open the browser: [${reject}].`)
        )
  );
});
