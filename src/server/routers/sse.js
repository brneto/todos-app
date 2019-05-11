import EventEmitter from 'events';
import uuid from 'uuid/v4';
import express from 'express';
import moment from 'moment';

const
  emitter = new EventEmitter(),
  router = express.Router(), // eslint-disable-line babel/new-cap
  baseUrl = '/sse',
  restUrl = `${baseUrl}/notices`,
  timeout = 2 * 60 * 1000,
  retry = 20 * 1000,
  eventList = [],
  noticeList = [],
  nodeEvent = 'notice',
  eventTypes = {
    addNotice: 'addnotice',
    updNotice: 'updnotice',
    delNotice: 'delnotice',
    claNotice: 'clanotice',
  },
  pushEvent = (res, event, id) => {
    res.write(`event: ${event.type}\n`);
    res.write(`data: ${JSON.stringify(event.data)}\n`);
    res.write(`id: ${id}\n`);
    if(event.retry)
      res.write(`retry: ${event.retry}\n`);
    res.write('\n');
  };

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

emitter.on(nodeEvent, event => eventList.push(event));

router.get(baseUrl, (req, res) => {
  const
    nextEventId = +req.header('Last-Event-ID') + 1,
    nextEvents = nextEventId ? eventList.slice(nextEventId) : eventList;

  res.writeHead(200, {
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Transfer-Encoding': 'chunked',
    'X-Accel-Buffering': 'no',
  });
  res.write('\n');
  res.write(`retry: ${retry}\n`);

  nextEvents.forEach((event, index) => pushEvent(res, event, index));
  res.flush();

  emitter.on(nodeEvent, () => {
    const eventLastIndex = eventList.length - 1;

    pushEvent(res, eventList[eventLastIndex], eventLastIndex);
    res.flush();
  });
  //https://tools.ietf.org/html/rfc7230#section-3.4
  //https://nodejs.org/api/http.html#http_request_end_data_encoding_callback
  res.setTimeout(timeout, socket => socket.end('0\r\n\r\n'));
});

router.post(restUrl, (req, res) => {
  const data = {
    id: uuid(),
    time: moment().format(),
    text: req.body.text,
  };

  emitter.emit(nodeEvent, {
    type: eventTypes.addNotice,
    retry: req.body.retry,
    data,
  });

  noticeList.push(data);
  res.set('Location', `${req.originalUrl}/${data.id}`);
  res.status(201).json(data);
});

router.put(`${restUrl}/:id`, (req, res) => {
  const data = {
    id: req.params.id,
    time: moment().format(),
    text: req.body.text,
  };

  emitter.emit(nodeEvent, {
    type: eventTypes.updNotice,
    retry: req.body.retry,
    data,
  });

  const foundIndex = noticeList.findIndex(item => item.id === data.id);
  if (foundIndex > -1) {
    noticeList[foundIndex] = data;
    res.status(200).json(data);
  } else {
    noticeList.push(data);
    res.status(201).json(data);
  }
});

router.delete(`${restUrl}/:id`, (req, res) => {
  const data = {
    id: req.params.id,
    time: moment().format(),
  };

  emitter.emit(nodeEvent, {
    type: eventTypes.delNotice,
    retry: req.body.retry,
    data,
  });

  const index = noticeList.findIndex(item => item.id === data.id);
  if (index !== -1) {
    res.status(200).json(noticeList.splice(index, 1));
  } else {
    res.sendStatus(404);
  }
});

router.delete(restUrl, (req, res) => {
  emitter.emit(nodeEvent, {
    type: eventTypes.claNotice,
    retry: req.body.retry,
  });

  noticeList.splice(0);
  res.sendStatus(200);
});

router.get(restUrl, (req, res) => {
  res.status(200).json(noticeList);
});

export default router;
