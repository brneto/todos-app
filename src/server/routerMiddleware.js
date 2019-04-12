import express from 'express';

const createRouterMiddleware = resourceBuffer => {
  const router = express.Router(); // eslint-disable-line babel/new-cap

  router.get('/source', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(resourceBuffer);
  });

  router.get('/*', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(resourceBuffer);
  });

  return router;
};

export default createRouterMiddleware;
