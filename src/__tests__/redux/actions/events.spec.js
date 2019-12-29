import { events } from '../../../client/redux/actions';

describe('Event action messages', () => {
  const filter = 'filterName';

  test('fetchingTodos event', () => {
    expect(events.fetchingTodos(filter)).toMatchSnapshot();
  });

  test('fetchedTodos event', () => {
    expect(events.fetchedTodos(filter)).toMatchSnapshot();
  });
});

