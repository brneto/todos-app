//https://github.com/glenjamin/ultimate-hot-reloading-example/blob/master/server.js
//import '@babel/polyfill';
import chalk from 'chalk';
import morgan from 'morgan';
import compression from 'compression';
import open from 'open';
import express from 'express';
import webpackBuilder from '../webpack';

const port = 3000;
const app = express();

console.log(chalk.green(`Starting app in ${process.env.NODE_ENV} mode...`));

webpackBuilder().then(middleware => {
  app.use(morgan('combined'), compression(), ...middleware);

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  // const watcher = chokidar.watch('./server');

  // watcher.on('ready', function() {
  //   watcher.on('all', function() {
  //     console.log("Clearing /server/ module cache from server");
  //     Object.keys(require.cache).forEach(function(id) {
  //       if (/[\/\\]server[\/\\]/.test(id)) delete require.cache[id];
  //     });
  //   });
  // });

  app.listen(port, error =>
    error
      ? console.log(`Server failed to start: [${error}].`)
      : console.log(`Server listening on port: ${port}.`) ||
        open(`http://localhost:${port}`).then(
          resolve => console.log(
            `Browser opened with command: '${resolve.spawnargs.join(' ')}'.`
          ),
          reject => console.log(`Failed to open the browser: [${reject}].`)
        )
  );
});
