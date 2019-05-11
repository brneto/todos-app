import { useState, useEffect } from 'react';

function useNotices(eventSourceUrl) {
  const [notices, setNotice] = useState([]);

  useEffect(() => {
    const
      eventSource = new EventSource(eventSourceUrl),
      eventHandler = {
        add: [
          'addnotice',
          event => setNotice(
            prevState => [...prevState, JSON.parse(event.data)]
          ),
          false,
        ],
        update: [
          'updnotice',
          event => setNotice(prevState => prevState.map(
            notice => {
              const eventData = JSON.parse(event.data);
              return notice.id === eventData.id ? eventData : notice;
            }
          )),
          false,
        ],
        delete: [
          'delnotice',
          event => setNotice(prevState => prevState.filter(
            notice => notice.id !== JSON.parse(event.data).id
          )),
          false,
        ],
        clear: ['clanotice', () => setNotice([]), false],
      };

    eventSource.addEventListener(...eventHandler.add);
    eventSource.addEventListener(...eventHandler.update);
    eventSource.addEventListener(...eventHandler.delete);
    eventSource.addEventListener(...eventHandler.clear);

    return () => {
      eventSource.removeEventListener(...eventHandler.add);
      eventSource.removeEventListener(...eventHandler.update);
      eventSource.removeEventListener(...eventHandler.delete);
      eventSource.removeEventListener(...eventHandler.clear);

      eventSource.close();
    };
  }, [eventSourceUrl]);

  return notices;
}

export { useNotices };
