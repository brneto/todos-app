import { useState, useEffect } from 'react';

function useNotices(url) {
  const [notices, setNotice] = useState([]);

  const applyEventDataToState = stateMutator => event => {
    const data = JSON.parse(event.data);
    setNotice(stateMutator(data));
  };

  useEffect(() => {
    const
      eventSource = new EventSource(url),
      eventHandler = {
        add: [
          'addnotice',
          applyEventDataToState(data => prevState => [...prevState, data]),
          // event => {
          //   const data = JSON.parse(event.data);
          //   setNotice(prevState => [...prevState, data]);
          // },
          false,
        ],
        update: [
          'updnotice',
          applyEventDataToState(data => prevState => prevState.map(
            notice => notice.id === data.id ? data : notice
          )),
          // event => {
          //   const data = JSON.parse(event.data);
          //   setNotice(prevState => prevState.map(
          //     notice => notice.id === data.id ? data : notice
          //   ));
          // },
          false,
        ],
        delete: [
          'delnotice',
          applyEventDataToState(data => prevState => prevState.filter(
            notice => notice.id !== data.id
          )),
          // event => {
          //   const data = JSON.parse(event.data);
          //   setNotice(prevState => prevState.filter(
          //     notice => notice.id !== data.id
          //   ));
          // },
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
  }, [url]);

  return notices;
}

export { useNotices };
