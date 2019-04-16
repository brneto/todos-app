import express from 'express';
import config from '../config.json';
import models from './models';
import routers from './routers';

const app = express();
const modelMiddleware = (req, res, next) => {
  req.models = models;

  next();
};

app.use(modelMiddleware);
app.use('/api', routers.todo);

app.listen(config.port, error =>
  error
    ? console.log(`Server failed to start: [${error}].`)
    : console.log(`Server running and listening on port: ${config.port}.`)
);
