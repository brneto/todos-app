module.exports = {
  // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
  apps : [{
    name: 'app',
    script: 'src/server.js',
    interpreter: 'node_modules/.bin/babel-node',
    autorestart: false,
    watch: ['src/server.js', 'src/builder'],
    ignore_watch: '*.test.js',
    output: 'logs/app-out.log',
    error: 'logs/app-err.err',
    log: 'logs/app.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};