import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Todo from './Todo';

// TODO: First replace by object notation
// TODO: https://www.styled-components.com/docs/advanced#style-objects
// TODO: Then experiment replace styled-components by Emotion
// TODO: https://emotion.sh/docs/introduction
// TODO: styled-components vs emotion
// TODO: https://github.com/jsjoeio/styled-components-vs-emotion/blob/master/README.md
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
