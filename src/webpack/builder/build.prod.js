import chalk from 'chalk';
import webpack from 'webpack';
import * as configs from '../configs';

export default new Promise ((resolve, reject) => {
  console.info(chalk.blue(
    '[prod-build] Generating minified bundle for production via Webpack.',
    'This will take a moment...'
  ));

  webpack(configs.prod, (err, stats) => {
    if (err) {
      console.info(chalk.green(
        'The transpiler for production was failed.'
      ));
      err.details && console.error(chalk.red(err.details));
      console.error(chalk.red(err.stack || err));
      reject(err);
    } else {
      console.info(
        '--------------------------------------------------------------'
      );
      console.info(stats.toString({ colors: true }));
      console.info(
        '--------------------------------------------------------------'
      );

      console.info(chalk.green(
        'The app has been transpile for production and written to',
        `${configs.prod.output.path}.`
      ));

      resolve(stats);
    }
  });
});
