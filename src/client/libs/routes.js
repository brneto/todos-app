// The routes object is identical to the props Route:
// {
//   path, // like /users/:id
//   strict, // optional, defaults to false
//   exact // optional, defaults to false
// }
const routes = {
  main: {
    path: '/:filter?',
    strict: false,
    exact: false,
  },
  hook: {
    path: '/hook'
  },
  noHook: {
    path: '/nohook'
  },
};

export default routes;
