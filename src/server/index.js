//https://github.com/glenjamin/ultimate-hot-reloading-example/blob/master/server.js
//import '@babel/polyfill';
import chalk from 'chalk';
import morgan from 'morgan';
import compression from 'compression';
import open from 'open';
import express from 'express';
import webpackBuilder from '../webpack';

const port = 3000;
const app = express();

console.log(chalk.green(`Starting app in ${process.env.NODE_ENV} mode...`));

webpackBuilder().then(middleware => {
  app.use(morgan('combined'), compression(), ...middleware);
  app.listen(port, error =>
    error
      ? console.log(`Server failed to start: [${error}].`)
      : console.log(`Server listening on port: ${port}.`) ||
        open(`http://localhost:${port}`).then(
          resolve => console.log(
            `Browser opened with command: '${resolve.spawnargs.join(' ')}'.`
          ),
          reject => console.log(`Failed to open the browser: [${reject}].`)
        )
  );
});
