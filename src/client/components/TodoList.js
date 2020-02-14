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
  createToggleTodoResource = id => api.todos.toggleTodo(id) |> api.createResource,
  propTypes = {
    resource: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
  };

function TodoList({ resource, onClick }) {
  const todos = resource.read();
  const [toggleResource, setToggleResource] = useState(null);
  toggleResource?.read();
  const handleToggle = id => createToggleTodoResource(id) |> setToggleResource;

  return (
    <List>
      {todos.map(({ id, ...rest }) => (
// <suspense key={id}>
        <Todo key={id} onClick={() => handleToggle(id) || onClick()} {...rest} />
// </suspense>
      ))}
    </List>
  );
}
TodoList.propTypes = propTypes;

export default TodoList;
