import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Todo from './Todo';

const
  List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
  `;

const
  propTypes = {
    todos: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
  },
  TodoList = ({ todos, onClick }) => (
    <List>
      {todos.map(({ id, ...rest }) => (
        <Todo key={id} onClick={() => onClick(id)} {...rest} />
      ))}
    </List>
  );

TodoList.propTypes = propTypes;

export default TodoList;
