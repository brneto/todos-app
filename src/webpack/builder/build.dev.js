import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import { htmlPluginOptions } from '../config/webpack.common';
import webpackConfig from '../config/webpack.dev';
import server from '../../server';

const compiler = webpack(webpackConfig);

console.log(chalk.blue(
  '[dev-build] Generating in-memory bundle for development via Webpack.',
  'wait a moment...'
));
const devMiddleware = webpackDev(compiler, {
  logLevel: 'trace',
  publicPath: webpackConfig.output.publicPath
});
const hotMiddleware = webpackHot(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 1000
});

export default new Promise(resolve => {
  devMiddleware.waitUntilValid(() => {
    console.log(chalk.green(
      'Your app has been compiled in development mode and written into memory.'
    ));

    const resourceBuffer = devMiddleware.fileSystem.readFileSync(path.join(
      webpackConfig.output.path,
      htmlPluginOptions.filename
    ));
    const spaMiddleware = server.routers.createSpa(resourceBuffer);

    resolve([devMiddleware, hotMiddleware, spaMiddleware]);
  });
});
