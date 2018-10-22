const webpackBuilder = async (env = process.env.NODE_ENV) =>
(env !== 'production'
  ? await import('./builder/build.dev')
  : await import('./builder/build.prod')
).default;

export default webpackBuilder;
