import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useAddTodo } from '../hooks/todo';

const Title = styled.h1`
  position: absolute;
  top: -155px;
  width: 100%;
  color: rgba(175, 47, 47, .15);
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  text-rendering: optimizeLegibility;
`;

const Input = styled.input`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 16px;
  border: none;
  background: rgba(0, 0, 0, .003);
  color: inherit;
  font-family: inherit;
  font-size: 24px;
  font-weight: inherit;
  line-height: 1.4em;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, .03);

  ::placeholder {
    color: #e6e6e6;
    font-style: italic;
    font-weight: 300;
  }
`;

export function AddTodoPresentation({ dispatch }) {
  const input = useAddTodo(dispatch);
  return (
    <header>
      <Title>todos</Title>
      <Input name="todo" placeholder="What needs to be done?" {...input} />
    </header>
  );
}

AddTodoPresentation.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AddTodoPresentation);
