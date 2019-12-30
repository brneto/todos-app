import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Todo from './Todo';

const
  List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
  `,
  TodoList = ({ error, todos, onTodoClick }) => {
    if (error) throw error;

    return todos.length ? (
      <List>
        {todos.map(todo => (
          <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
        ))}
      </List>
    ) : null;
  };

TodoList.propTypes = {
  error: PropTypes.objectOf(Error),
  todos: PropTypes.array.isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

export default TodoList;
