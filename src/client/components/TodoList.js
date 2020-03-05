import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { getFilterPath } from '../redux/reducers';
import Todo from './Todo';

const
  List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
  `,
  Status = styled.p`
    margin-left: 1em;
  `;

const
  propTypes = {
    resource: PropTypes.object.isRequired,
    todos: PropTypes.array,
    onClick: PropTypes.func.isRequired,
    onFetch: PropTypes.func.isRequired,
  };

function TodoList({ resource, todos, onFetch, onClick }) {
  // https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  if (!todos) {
    onFetch(resource.read(), getFilterPath());
    return <Status>You have nothing to do yet!</Status>;
  }

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
