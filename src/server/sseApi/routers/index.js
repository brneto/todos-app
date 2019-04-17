// https://jasonbutz.info/2018/08/server-sent-events-with-node/
import { Router } from 'express';

const router = Router(); // eslint-disable-line babel/new-cap

let sendEvent;
const createEventSender = res => msg => {
  let id = 0;

  res.write(`id: ${++id}\n`);
  res.write('event: messages\n');
  res.write(`data: ${msg} -- timestamp: ${Date.now()}\n\n`);
};

router.get('/sse', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'charset': 'utf-8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.write('\n');

  sendEvent = createEventSender(res);
});

router.post('/sse/:msg', (req, res) => {
  sendEvent(req.params.msg);
  res.send('Server Sent Event sended successful.\n');
});

export default {
  sse: router,
};
