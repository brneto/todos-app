import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import { HTML_INDEX } from '../config/webpack.common';
import webpackConfig from '../config/webpack.dev';
import createSpaMiddleware from '../../server/createSpaMiddleware';


console.log(chalk.blue(
  '[dev-build]',
  'Generating in-memory bundle for development via Webpack.',
  'wait a moment...'
));

const buildPath = webpackConfig.output.publicPath;
const compiler = webpack(webpackConfig);

const devMiddleware = webpackDev(compiler, {
  logLevel: 'trace',
  publicPath: buildPath
});

const hotMiddleware = webpackHot(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 1000
});

const resourcePath = path.join(buildPath, HTML_INDEX);
const resourceBuffer = devMiddleware.fileSystem.readFileSync(resourcePath);
const spaMiddleware = createSpaMiddleware(resourceBuffer, resourcePath);

export default [devMiddleware, hotMiddleware, spaMiddleware];
