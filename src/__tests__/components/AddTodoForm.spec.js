import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import AddTodoForm from '../../client/components/AddTodoForm';

describe('components/AddTodo', () => {
  it('should call handle methods', () => {
    const handleChange = jest.fn();
    const handleKeyDown = jest.fn();

    // render the todo form with a fake key down handler
    const formProps = {
      value: '',
      onChange: handleChange,
      onKeyDown: handleKeyDown,
    };
    const { getByPlaceholderText, container } = render(
      <AddTodoForm input={formProps} />
    );

    // get the todo input
    const todoInput = getByPlaceholderText('What needs to be done?');
    // Fires onChange event
    fireEvent.change(todoInput, { target: { value: 'change' } });
    // Fires onKeyDown event
    fireEvent.keyDown(todoInput);

    // assert that our fake submit handler was called once
    expect(handleChange).toHaveBeenCalledTimes(1);
    // assert that our fake submit was called with the right stuff
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    // assert if equal to snapshot
    expect(container.firstChild).toMatchSnapshot();
  });
});
