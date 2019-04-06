import path from 'path';

export const getRequestedResource = req => req.url.split('/').pop();

export const getResourcePath = (cfg, rsc) => path.join(cfg.output.path, rsc);

export const createResourceBuffer = (cfg, fs) => rsc =>
  fs.readFileSync(getResourcePath(cfg, rsc));

export const spaServerRules = (getResource, indexResourceName) => (req, res, next) => {
  const requestedResource = getRequestedResource(req);
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
