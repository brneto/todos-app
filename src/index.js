import chalk from 'chalk';
import build from './webpack/builder';

const target = process.env.NODE_ENV ?? 'development';

console.log(chalk.green('Starting app in', target, 'mode...'));
build(target);
