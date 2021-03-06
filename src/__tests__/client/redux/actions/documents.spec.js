import { documents } from '../../../../client/redux/actions';

describe('Document action messages', () => {
  const
    filter = 'filterName',
    error = new Error('Boom!'),
    response = 'responseData';

  test('todosFetched document', () => {
    expect(documents.todosFetched(response, filter)).toMatchSnapshot();
    expect(documents.todosFetched(error, filter)).toMatchSnapshot();
  });

  test('todoAdded document', () => {
    expect(documents.todoAdded(response, filter)).toMatchSnapshot();
    expect(documents.todoAdded(error, filter)).toMatchSnapshot();
  });

  test('todoToggled document', () => {
    expect(documents.todoToggled(response, filter)).toMatchSnapshot();
    expect(documents.todoToggled(error, filter)).toMatchSnapshot();
  });
});
