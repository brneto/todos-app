import fs from 'fs';
import chokidar from 'chokidar';
import webpack from 'webpack';
import express from 'express';
import chalk from 'chalk';
import prodConfig from '../config/webpack.prod';
import spaHandler from '../../server/spaHandler';
import {
  getResourcePath,
  createResourceBuffer
} from './build.util';

console.log(chalk.blue(
  '[prod-build]',
  'Generating minified bundle for production via Webpack.',
  'This will take a moment...'
));
const outputPath = prodConfig.output.path;
const compiler = webpack(prodConfig);

compiler.run((err, stats) => {
  if (err) {
    err.details && console.error(chalk.red(err.details));
    console.error(chalk.red(err.stack || err));
  } else {
    console.log('--------------------------------------------------------------');
    console.log(stats.toString({ colors: true }));
    console.log('--------------------------------------------------------------');
    console.log(chalk.green(
      `Your app has been compiled in production mode and written to ${outputPath}.`
    ));
  }
});

const prodMiddleware = express.static(outputPath);

const getResource = createResourceBuffer(prodConfig, fs);
const indexFilename = 'index.html';
const runSpaMiddleware = spaHandler(getResource, indexFilename);
const watcher = chokidar.watch(
  getResourcePath(prodConfig, indexFilename),
  { ignoreInitial: true }
);

const spaMiddleware = (req, res, next) => {
  watcher.on('ready', () => {
    watcher.on('add', file => {
      console.log(`File ${file} has been added.`);
      runSpaMiddleware(req, res, next);
      watcher.close();
    });
  });
};

export default [prodMiddleware, spaMiddleware];
