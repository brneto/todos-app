// The routes object is identical to the props Route:
// {
//   path, // like /users/:id
//   strict, // optional, defaults to false
//   exact // optional, defaults to false
// }
const main = {
  path: '/:filter?',
  strict: false,
  exact: false,
};

const hook = {
  path: '/hook'
};

const noHook = {
  path: '/nohook'
};

export {
  main,
  hook,
  noHook,
};
