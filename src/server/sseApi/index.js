import express from 'express';
import config from '../../config.json';
import routers from './routers';

const app = express();
const port = config.server.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/sse', routers.sse);

app.listen(port, error =>
  error
    ? console.log(`Server failed to start: [${error}].`)
    : console.log(`Server running and listening on port: ${port}.`)
);
