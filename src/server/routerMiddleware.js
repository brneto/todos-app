const createRouterMiddleware = (resourceBuffer, resourcePath) => (req, res, next) => {
  const resource = resourcePath.split('/').pop();
  const requested = req.url.split('/').pop();

  switch (requested) {
    case resource:
    case requested.replace(/\.html?$/gi, ''):
      if(requested === 'source')
        res.set('Content-Type', 'text/plain');

      res.end(resourceBuffer);
      break;
    default:
      next();
  }
};

export default createRouterMiddleware;
