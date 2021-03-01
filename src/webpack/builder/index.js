import morgan from 'morgan';
import compression from 'compression';
import express from 'express';
import * as server from '../../server';

async function build(target) {
  let module;

  if (target === 'building') {
      // ToDo: Change to use webpack to also transpile the server code.
      // https://github.com/yusinto/universal-hot-reload/blob/master/src/index.js
      // https://webpack.js.org/api/node/#watching
      // https://github.com/liady/webpack-node-externals
      module = await import('./build.prod');
      await module.default;
  } else {
    // ToDo: https://basarat.gitbook.io/typescript/main-1/defaultisbad
    module = await import('./build.dev');
    const builder = await module.default;
    const app = express();

    app.use(morgan('combined'), compression(), builder.router);
    app.use(server.createSpa(builder.resourceBuffer));
    server.listen(app);
  }
}

export default build;
