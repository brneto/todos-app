import chalk from 'chalk';
import webpack from 'webpack';
import * as configs from '../configs';

const
  blue = chalk.blue,
  green = chalk.green,
  red = chalk.red;

export default new Promise ((resolve, reject) => {
  console.info(blue(
    '[prod-build] Generating minified bundle for production via Webpack.',
    'This will take a moment...'
  ));

  webpack(configs.prod, (err, stats) => {
    if (err) {
      console.info(green('The transpiler for production was failed.'));
      err.details && console.error(red(err.details));
      console.error(red(err.stack || err));
      reject(err);
    } else {
      console.info(
        '--------------------------------------------------------------'
      );
      console.info(stats.toString({ colors: true }));
      console.info(
        '--------------------------------------------------------------'
      );

      console.info(green(
        'The app has been transpile for production and written to',
        `${configs.prod.output.path}.`
      ));

      resolve(stats);
    }
  });
});
