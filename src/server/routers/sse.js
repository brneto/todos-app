// https://jasonbutz.info/2018/08/server-sent-events-with-node/
// https://github.com/expressjs/compression#server-sent-events
import express from 'express';

const url = '/sse';
const router = express.Router(); // eslint-disable-line babel/new-cap

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let id = 0;
const createEventSender = res => msg => {
  res.write(`id: ${++id}\n`);
  res.write('event: messages\n');
  res.write(`data: [ts: ${Date.now()}] ${msg}\n\n`);
  res.flush();
};

let sendEvent;
router.get(url, (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.write('\n');

  sendEvent = createEventSender(res);
});

router.post(url, (req, res) => {
  sendEvent(req.body.text);
  res.send('Sended Server-sent event successfully!\n');
});

export default router;
