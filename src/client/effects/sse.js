import * as api from '../api';

const createMessagesEffect = setState => () => {
  const messagesUnsubscribe = api.sse.messagesSubscribe(event =>
    setState(prevState => [...prevState, event.data])
  );

  return messagesUnsubscribe;
};

export { createMessagesEffect };
