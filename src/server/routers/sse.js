// https://www.voorhoede.nl/en/blog/real-time-communication-with-server-sent-events/
// https://github.com/expressjs/compression#server-sent-events
import EventEmitter from 'events';
import express from 'express';
import uuid from 'uuid/v4';
import moment from 'moment';

const emitter = new EventEmitter();
const router = express.Router(); // eslint-disable-line babel/new-cap
const url = '/sse';
const getMSecs = s => s * 1000;
const retry = getMSecs(10);
const timeout = getMSecs(120);
const eventList = [];
const noticeList = [];
const nodeEvent = 'notice';
const eventTypes = {
  addNotice: 'addnotice',
  uptNotice: 'updnotice',
  delNotice: 'delnotice',
  claNotice: 'claNotice',
};
const writeSSE = (res, event, id) => {
  res.write(`event: ${event.type}\n`);
  res.write(`data: ${event.data}\n`);
  res.write(`id: ${id}\n`);
  res.write(`retry: ${event.retry || retry}\n\n`);
};

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

emitter.on(nodeEvent, event => eventList.push(event));

router.get(url, (req, res) => {
  const eventNextId = +req.header('Event-Last-ID') + 1;
  const events = eventNextId ? eventList.slice(eventNextId) : eventList;

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Transfer-Encoding': 'chunked',
  });
  res.write('\n');

  events.forEach((event, index) => writeSSE(res, event, index));
  res.flush();

  emitter.on(nodeEvent, () => {
    const eventLastIndex = eventList.length - 1;

    writeSSE(res, eventList[eventLastIndex], eventLastIndex);
    res.flush();
  });

  res.setTimeout(timeout, socket => socket.end('0\r\n'));
});

router.post(`${url}/notices`, (req, res) => {
  const data = {
    id: uuid(),
    time: moment().format(),
    text: req.body.text,
  };

  noticeList.push(data);
  emitter.emit(nodeEvent, {
    type: eventTypes.addNotice,
    data,
    retry: req.body.retry,
  });

  res.send(req.body);
});

router.get(`${url}/notices`, (req, res) => {
  res.send(eventList);
});

router.delete(`${url}/notices/:id`, (req, res) => {
  res.send(eventList.splice(req.params.id, 1));
});

export default router;
