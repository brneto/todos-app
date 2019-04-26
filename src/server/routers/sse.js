// https://www.voorhoede.nl/en/blog/real-time-communication-with-server-sent-events/
// https://github.com/expressjs/compression#server-sent-events
import express from 'express';

const url = '/sse';
const router = express.Router(); // eslint-disable-line babel/new-cap

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.get(url, (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.write('\n');

  let id = 0
  req.app.on('sse', msg => {
    res.write(`id: ${++id}\n`);
    res.write('event: messages\n');
    res.write('retry: 10000\n');
    res.write(`data: [ts: ${Date.now()}] ${msg}\n\n`);
    res.flush();
  };
});

router.post(url, (req, res) => {
  req.app.emit('sse', req.body.text);
  res.send('Sended Server-sent event successfully!\n');
});

export default router;
