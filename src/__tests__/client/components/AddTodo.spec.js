import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AddTodoPresentation } from '../../../client/components/AddTodo';

describe('components/AddTodo', () => {
  it('should call handle methods', () => {
    const dispatch = jest.fn();

    // render the todo form with a fake dispatch
    const props = { dispatch };
    const { getByPlaceholderText, container } = render(
      <AddTodoPresentation {...props} />
    );

    // get the todo input
    const todoInput = getByPlaceholderText('What needs to be done?');
    // Fires onChange event
    fireEvent.change(todoInput, { target: { value: 'change' } });
    // Fires enter onKeyDown event
    fireEvent.keyDown(todoInput, { keyCode: 13 });

    // assert that our fake dispatch was called with the right stuff
    expect(dispatch).toHaveBeenCalledTimes(1);
    // assert if equal to snapshot
    expect(container.firstChild).toMatchSnapshot();
  });
});
