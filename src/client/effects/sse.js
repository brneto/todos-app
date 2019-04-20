import { sse } from '../api';

const createMessagesEffect = setState => () => {
  const messagesUnsubscribe = sse.messagesSubscribe(event =>
    setState(prevState => [...prevState, event.data])
  );

  return messagesUnsubscribe;
};

export default { createMessagesEffect };
