import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import * as configs from '../configs';

export default new Promise(resolve => {
  console.log(chalk.blue(
    '[dev-build] Generating in-memory bundle for development via Webpack.',
    'wait a moment...'
  ));
  const compiler = webpack(configs.dev);

  const devMiddleware = webpackDev(compiler, {
    logLevel: 'trace',
    publicPath: configs.dev.output.publicPath
  });

  const hotMiddleware = webpackHot(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 1000
  });

  devMiddleware.waitUntilValid(() => {
    console.log(chalk.green(
      'Your app has been compiled in development mode and written into memory.'
    ));

    const resourceBuffer = devMiddleware.fileSystem.readFileSync(path.join(
      configs.dev.output.path,
      configs.htmlPluginOptions.filename
    ));

    resolve({
      router: [devMiddleware, hotMiddleware],
      resourceBuffer
    });
  });
});
