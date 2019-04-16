import todos from './todos';

const models = {
  todos,
};

export default (req, res, next) => {
  req.models = models;
  next();
};
