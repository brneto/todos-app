import chalk from 'chalk';
import webpack from 'webpack';
import webpackConfig from '../config/webpack.prod';

const compiler = webpack(webpackConfig);

console.log(chalk.blue(
  '[prod-build] Generating minified bundle for production via Webpack.',
  'This will take a moment...'
));
compiler.run((err, stats) => {
  if (err) {
    console.log(chalk.green(
      'The transpiler for production was failed.'
    ));
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
      'The app has been transpiled for production and written to',
      `${webpackConfig.output.path}.`
    ));
  }
});
