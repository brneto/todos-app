import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import chalk from 'chalk';
import webpackConfig from '../config/webpack.dev';
import spaHandler from '../../server/spaHandler';
import { createResourceBuffer } from './build.util';

const compiler = webpack(devConfig);

console.log(chalk.blue(
  '[dev-build]',
  'Generating in-memory bundle for development via Webpack.',
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

const getResource = createResourceBuffer(webpackConfig, devMiddleware.fileSystem);
const indexFilename = 'index.html';
const spaMiddleware = spaHandler(getResource, indexFilename);

export default [devMiddleware, hotMiddleware, spaMiddleware];
