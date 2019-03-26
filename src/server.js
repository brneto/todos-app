//import '@babel/polyfill';
import http from 'http';
import chalk from 'chalk';
import morgan from 'morgan';
import compression from 'compression';
import open from 'open';
import express from 'express';
import webpackBuilder from './webpack';

const port = 3000;
const app = express();
const server = http.createServer(app);

// eslint-disable-next-line no-console
console.log(chalk.green(`Starting app in ${process.env.NODE_ENV} mode...`));

webpackBuilder().then(middleware => {
  app.use(morgan('combined'), compression(), middleware);
  server.listen(port,
    // eslint-disable-next-line no-console
    err => (err ? console.log(err) : open(`http://localhost:${port}`))
  );
});
