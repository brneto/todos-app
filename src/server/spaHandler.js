const spaHandler = (getResource, indexResourceName) => (req, res, next) => {
  const requestedResource = req.url.split('/').pop();
  const indexResource = getResource(indexResourceName);

  switch (requestedResource) {
    case indexResourceName:
    case requestedResource.replace(/\.html?$/gi, ''):
      if(requestedResource === 'source') {
        res.set('Content-Type', 'text/plain');
      }

      res.end(indexResource);
      break;
    default:
      next();
  }
};

export default spaHandler;
