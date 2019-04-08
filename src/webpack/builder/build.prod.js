import fs from 'fs';
import path from 'path';
import express from 'express';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackConfig, { HTML_INDEX } from '../config/webpack.common';
import createSpaMiddleware from '../../server/createSpaMiddleware';
import { runOnFsChange } from './build.util';

console.log(
  chalk.blue(
    '[prod-build]',
    'Generating minified bundle for production via Webpack.',
    'This will take a moment...'
  )
);

const buildPath = webpackConfig.output.path;
const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  if (err) {
    err.details && console.error(chalk.red(err.details));
    console.error(chalk.red(err.stack || err));
  } else {
    console.log(
      '--------------------------------------------------------------'
    );
    console.log(stats.toString({ colors: true }));
    console.log(
      '--------------------------------------------------------------'
    );
    console.log(
      chalk.green(
        `Your app has been compiled in production mode and written to ${buildPath}.`
      )
    );
  }
});

const prodMiddleware = express.static(buildPath);

const resourcePath = path.join(buildPath, HTML_INDEX);
const resourceBuffer = fs.readFileSync(resourcePath);
const spaMiddleware = createSpaMiddleware(resourceBuffer, resourcePath);

const waitFsMiddleware = (req, res, next) =>
  runOnFsChange(resourcePath, () => {
    prodMiddleware(req, res, next);
    spaMiddleware(req, res, next);
  });

export default [waitFsMiddleware];
