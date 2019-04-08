import chokidar from 'chokidar';

export const runOnFsChange = (resourcePath, callback) => {
  const watcher = chokidar.watch(resourcePath);

  watcher.on('ready', () => {
    watcher.on('all', resource => {
      console.log(`Resource ${resource} has been changed.`);
      callback();
    });
  });
};
