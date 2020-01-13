import { effects } from '../../../../client/redux/actions';

describe('Side Effect Command action messages', () => {
  test('fetchTodos effect', () => {
    expect(effects.fetchTodos()).toMatchSnapshot();
  });

  test('addTodo effect', () => {
    expect(effects.addTodo('hello!')).toMatchSnapshot();
  });

  test('toggleTodo effect', () => {
    expect(effects.toggleTodo('123')).toMatchSnapshot();
  });
});
