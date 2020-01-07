import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as hooks from '../hooks';

// TODO: Replace styled-components by Emotion
// TODO: https://emotion.sh/docs/introduction
const
  Title = styled.h1({
    position: 'absolute',
    top: '-155px',
    width: '100%',
    color: 'rgba(175, 47, 47, .15)',
    fontSize: '100px',
    fontWeight: '100',
    textAlign: 'center',
    textRendering: 'optimizeLegibility',
  }),
  Input = styled.input({
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    margin: '0',
    padding: '16px',
    border: 'none',
    background: 'rgba(0, 0, 0, .003)',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: '24px',
    fontWeight: 'inherit',
    lineHeight: '1.4em',
    boxShadow: 'inset 0 -2px 1px rgba(0, 0, 0, .03)',

    '::placeholder': {
      color: '#e6e6e6',
      fontStyle: 'italic',
      fontWeight: '300',
    },
  });

  const
    subscribe = connect(),
    propTypes = { dispatch: PropTypes.func.isRequired };

export function AddTodoPresentation({ dispatch }) {
  const // Custom hook:
    input = hooks.todos.useAddTodo(dispatch);

  return (
    <header>
      <Title>todos</Title>
      <Input name="todo" placeholder="What needs to be done?" {...input} />
    </header>
  );
}

AddTodoPresentation.propTypes = propTypes;

export default subscribe(AddTodoPresentation);
