import { events } from '../../../../client/redux/actions';

describe('Event action messages', () => {
  const filter = 'filterName';

  test('start fetching event', () => {
    expect(events.fetchStart(filter)).toMatchSnapshot();
  });

  test('success fetching event', () => {
    expect(events.fetchSuccess(filter)).toMatchSnapshot();
  });

  test('fail fetching event', () => {
    expect(events.fetchFail(filter)).toMatchSnapshot();
  });
});

