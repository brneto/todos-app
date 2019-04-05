//https://pm2.io/doc/en/runtime/reference/ecosystem-file/
module.exports = {
  apps : [{
    name: 'app',
    script: 'src/server/index.js',
    interpreter: 'node_modules/.bin/babel-node',
    autorestart: false,
    watch: ['src/server', 'src/webpack'],
    ignore_watch: '/__tests__/.*|(\\.|/)(test|spec)\\.[jt]sx?$',
    output: 'logs/app-out.log',
    error: 'logs/app-err.log',
    log: 'logs/app-outerr.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
