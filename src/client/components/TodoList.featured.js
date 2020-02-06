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
    resource: PropTypes.instanceOf(Promise).isRequired,
    onClick: PropTypes.func.isRequired,
  };

function TodoList({ resource, onClick }) {
  const todos = resource.read();
  return (
    <List>
      {todos.map(({ id, ...rest }) => (
        <Todo key={id} onClick={() => onClick(id)} {...rest} />
      ))}
    </List>
  );
}
TodoList.propTypes = propTypes;

export default TodoList;
