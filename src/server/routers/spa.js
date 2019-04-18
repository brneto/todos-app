import { Router } from 'express';

const createRouter = resourceBuffer => {
  const router = Router(); // eslint-disable-line babel/new-cap

  router.get('/source', (req, res) => {
    res.type('txt');
    res.send(resourceBuffer);
  });

  router.get('/**', (req, res, next) => {
    const isApiUrl = /^\/api\//.test(req.path);

    if (isApiUrl) {
      next();
    } else {
      res.type('html');
      res.send(resourceBuffer);
    }
  });

  return router;
};

export default createRouter;
