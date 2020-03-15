import { events } from '../../../../client/redux/actions';

describe('Event action messages', () => {
  const filter = 'filterName';

  test('start fetching event', () => {
    expect(events.startedFetch(filter)).toMatchSnapshot();
  });

  test('success fetching event', () => {
    expect(events.succeedFetch(filter)).toMatchSnapshot();
  });

  test('fail fetching event', () => {
    expect(events.failedFetch(filter)).toMatchSnapshot();
  });
});

