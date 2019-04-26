// https://www.voorhoede.nl/en/blog/real-time-communication-with-server-sent-events/
// https://github.com/expressjs/compression#server-sent-events
import express from 'express';

const url = '/sse';
const router = express.Router(); // eslint-disable-line babel/new-cap
const messageList = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.get(url, (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.write('\n');

  req.app.on('sse', data => {
    const lastIndex = data.length - 1;
    res.write(`id: ${lastIndex}\n`);
    res.write('event: messages\n');
    res.write('retry: 10000\n');
    res.write(`data: [ts: ${Date.now()}] ${data[lastIndex]}\n\n`);
    res.flush();
  };
});

router.post(url, (req, res) => {
  messageList.push(req.body.text);
  req.app.emit('sse', messageList);
  
  res.send('Sended Server-sent event successfully!\n');
});
  
router.get(`${url}/list`, (req, res) => {
  res.send(messageList);
});

router.delete(`${url}/:idx`, (req, res) => {
  res.send(messageList.splice(req.params.idx, 1));
});

export default router;
