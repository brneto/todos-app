import { commands } from '../../../client/redux/actions';

// addTodoToList, removeTodoFromList
describe('Pure Command action messages', () => {
  const
    filter = 'filterName',
    response = 'responseData';

  test('addTodoToList command', () => {
    expect(commands.addTodoToList(response, filter)).toMatchSnapshot();
  });

  test('removeTodoFromList command', () => {
    expect(commands.removeTodoFromList(response, filter)).toMatchSnapshot();
  });
});
