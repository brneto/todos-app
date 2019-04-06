import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import chalk from 'chalk';
import devConfig from '../config/webpack.dev';
import {
  createResourceBuffer,
  spaServerRules
} from './build.util';

const compiler = webpack(devConfig);

console.log(chalk.blue(
  '[dev-build]',
  'Generating in-memory bundle for development via Webpack.',
  'wait a moment...'
));

const devMiddleware = webpackDev(compiler, {
  logLevel: 'trace',
  publicPath: devConfig.output.publicPath
});

const hotMiddleware = webpackHot(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 1000
});

const getResource = createResourceBuffer(devConfig, devMiddleware.fileSystem);
const indexFilename = 'index.html';
const spaMiddleware = spaServerRules(getResource, indexFilename);

export default [devMiddleware, hotMiddleware, spaMiddleware];
