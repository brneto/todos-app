import fs from 'fs';
import path from 'path';
import express from 'express';
import chalk from 'chalk';
import webpack from 'webpack';
import { HTML_INDEX } from '../config/webpack.common';
import webpackConfig from '../config/webpack.prod';
import createRouterMiddleware from '../../server/routerMiddleware';

console.log(
  chalk.blue(
    '[prod-build]',
    'Generating minified bundle for production via Webpack.',
    'This will take a moment...'
  )
);

const buildPath = webpackConfig.output.path;
const compiler = webpack(webpackConfig);

export default new Promise(resolve => {
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

      console.log(chalk.green(
        `Your app has been compiled in production mode and written to ${buildPath}.`
      ));

      const prodMiddleware = express.static(buildPath);
      const resourcePath = path.join(buildPath, HTML_INDEX);
      const resourceBuffer = fs.readFileSync(resourcePath);
      const routerMiddleware = createRouterMiddleware(resourceBuffer, resourcePath);
      resolve([prodMiddleware, routerMiddleware]);
    }
  });
});
