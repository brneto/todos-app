import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO: Replace styled-components by Emotion
// TODO: https://emotion.sh/docs/introduction
// TODO: styled-components vs emotion
// TODO: https://github.com/jsjoeio/styled-components-vs-emotion/blob/master/README.md
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
  `;

const
  propTypes = {
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  },
  Todo = ({
    text,
    completed,
    onClick,
  }) => (
    <Item onClick={onClick} completed={completed}>
      <Text>{text}</Text>
    </Item>
  );

Todo.propTypes = propTypes;

export default Todo;
