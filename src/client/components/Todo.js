import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const
  Item = styled.li`
    position: relative;
    border-bottom: 1px solid #ededed;
    color: ${props => props.completed ? '#d9d9d9' : 'inherit'};
    font-size: 24px;
    text-decoration: ${props => props.completed ? 'line-through' : 'none'};
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }
  `,
  Text = styled.span`
    display: block;
    padding: 15px 15px 15px 30px;
    word-break: always;
    transition: color .4s;
    line-height: 1.2;
  `,
  Todo = ({
    onClick,
    completed,
    text,
  }) => (
    <Item onClick={onClick} completed={completed}>
      <Text>{text}</Text>
    </Item>
  );

Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Todo;
