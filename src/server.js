//import '@babel/polyfill';
import chalk from 'chalk';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import open from 'open';
import webpackBuilder from './webpack';

const app = express();
const port = 3000;

// eslint-disable-next-line no-console
console.log(chalk.green(`Starting app in ${process.env.NODE_ENV} mode...`));

app.use(morgan('combined'));
app.use(compression());
webpackBuilder().then(middleware => {
  app.use(middleware);
  app.listen(
    port,
    // eslint-disable-next-line no-console
    err => (err ? console.log(err) : open(`http://localhost:${port}`))
  );
});
