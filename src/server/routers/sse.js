// https://jasonbutz.info/2018/08/server-sent-events-with-node/
// https://github.com/expressjs/compression#server-sent-events
import { Router } from 'express';

const router = Router(); // eslint-disable-line babel/new-cap

let sendEvent;
const createEventSender = res => msg => {
  let id = 0;
  res.write(`id: ${++id}\n`);
  res.write('event: messages\n');
  res.write(`data: [ts: ${Date.now()}] ${msg}\n\n`);
  res.flush();
};

router.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.write('\n');

  sendEvent = createEventSender(res);
});

router.post('/', (req, res) => {
  sendEvent(req.body.text);
  res.send('Sended Server-sent event successfully!\n');
});

export default router;
