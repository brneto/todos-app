import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as api from '../api';
import Todo from './Todo';

const
  List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
  `;

const
  propTypes = {
    resource: PropTypes.object.isRequired,
    //onClick: PropTypes.func.isRequired,
  };

function TodoList({ resource }) {
  const todos = resource.read();
  const [todoList, setTodoList] = useState(todos);

  const handleClick = id => {
    if (api.getFilterPath() === 'completed')
      setTodoList(todoList.filter(todo => todo.id !== id));
  };


  return (
    <List>
      {todoList.map(({ id, ...rest }) => (
        <Todo key={id} onClick={() => handleClick(id)} {...rest} />
      ))}
    </List>
  );
}
TodoList.propTypes = propTypes;

export default TodoList;
