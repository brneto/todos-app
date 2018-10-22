import fs from 'fs';
import chokidar from 'chokidar';
import webpack from 'webpack';
import express from 'express';
import chalk from 'chalk';
import prodConfig from '../config/webpack.prod';
import {
  getResourcePath,
  createResourceBuffer,
  spaServerRules
} from './build.util';

/* eslint-disable no-console */
console.log(chalk.blue(
  '[prod-build]',
  'Generating minified bundle for production via Webpack.',
  'This will take a moment...'
));
const outputPath = prodConfig.output.path;
const compiler = webpack(prodConfig);

compiler.run((err, stats) => {
  if (err) {
    console.error(chalk.red(err.stack || err));
    if(err.details) {
      console.error(chalk.red(err.details));
    }
    return;
  }

  console.log('--------------------------------------------------------------');
  console.log(stats.toString({ colors: true }));
  console.log('--------------------------------------------------------------');

  console.log(chalk.green(
    'Your app has been compiled in production mode and written to',
    ` ${outputPath}.`
  ));
});

const prodMiddleware = express.static(outputPath);
const getResource = createResourceBuffer(prodConfig, fs);
const indexFilename = 'index.html';

const spaMiddleware = (req, res, next) => {
  const watcher = chokidar.watch(
    getResourcePath(prodConfig, indexFilename),
    { ignoreInitial: true }
  );

  watcher.on('add', file => {
    console.log(`File ${file} has been added.`);
    const runRules = spaServerRules(indexFilename, getResource);
    runRules(req, res, next);

    watcher.close();
  });
};

export default [prodMiddleware, spaMiddleware];
