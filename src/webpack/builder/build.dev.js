import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import * as configs from '../configs';

export default new Promise(resolve => {
  console.info(chalk.blue(
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
    console.info(chalk.green(
      'Your app has been compiled in development mode and written into memory.'
    ));
    devMiddleware.fileSystem
      .readdirSync(configs.dev.output.path)
      .forEach(f => console.info(chalk.green('build.dev:', 'devMiddlewareFileSystem =', f)));

    const resourceBuffer =
      devMiddleware.fileSystem
        .readFileSync(path.join(configs.dev.output.path, configs.htmlIndex.filename));

    resolve({
      router: [devMiddleware, hotMiddleware],
      resourceBuffer
    });
  });
});
