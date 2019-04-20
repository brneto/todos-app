function messagesSubscribe(eventHandler) {
  const eventType = 'messages';
  const eventSource = new EventSource('/api/sse');

  eventSource.addEventListener(eventType, eventHandler);
  return () => {
    eventSource.removeEventListener(eventType, eventHandler);
    eventSource.close();
  };
}

export {
  messagesSubscribe,
};
