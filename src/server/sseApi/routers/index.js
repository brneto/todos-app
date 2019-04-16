// https://jasonbutz.info/2018/08/server-sent-events-with-node/
// https://medium.com/@moinism/using-nodejs-for-uni-directional-event-streaming-sse-c80538e6e82e
import { Router } from 'express';

const router = Router(); // eslint-disable-line babel/new-cap

// const sseDemo = (req, res) => {
//   let id = 0;

//   const intervalId = setInterval(() => {
//     console.log('runEvent');
//     res.write(`id: ${id}\n`);
//     res.write('event: messages\n');
//     res.write(`data: Test Message -- ${Date.now()}\n\n`);
//     id += 1;
//   }, 1000);

//   req.on('close', () => {
//     clearInterval(intervalId);
//   });
// };

let sendEvent;
const createEventSender = res => msg => {
  let id = 1;
  res.write(`id: ${id}\n`);
  res.write('event: messages\n');
  res.write(`data: ${msg} -- ${Date.now()}\n\n`);

  id += 1;
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
  //sseDemo(req, res);
});

router.post('/sse/:msg', (req, res) => {
  sendEvent(req.params.msg);
  res.send('Event sended!\n');
});

export default {
  sse: router,
};
