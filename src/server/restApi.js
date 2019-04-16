import express from 'express';
import config from '../config.json';
import models from './models';
import routers from './routers';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(models);
app.use('/api/todos', routers.todo);

app.listen(config.port, error =>
  error
    ? console.log(`Server failed to start: [${error}].`)
    : console.log(`Server running and listening on port: ${config.port}.`)
);
