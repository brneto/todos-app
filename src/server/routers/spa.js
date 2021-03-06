import { Router } from 'express';

function createRouter(resourceBuffer) {
  const router = Router(); // eslint-disable-line babel/new-cap

  function showSourceHandler(req, res) {
    res.type('txt');
    res.send(resourceBuffer);
  }

  function spaHandler(req, res, next) {
    const isApiRequest = /^\/api\/.+/.test(req.path);

    if (isApiRequest) {
      next();
    } else {
      res.type('html');
      res.send(resourceBuffer);
    }
  }

  router.get('/source', showSourceHandler);
  router.get('/**', spaHandler);

  return router;
}

export default createRouter;
