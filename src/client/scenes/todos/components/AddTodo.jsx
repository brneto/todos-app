import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { todos } from './hooks';

const
  Header = styled.header`
    & > h1 {
      position: absolute;
      top: -155px;
      width: 100%;
      color: rgba(175, 47, 47, .15);
      font-size: 100px;
      font-weight: 100;
      text-align: center;
      text-rendering: optimizeLegibility;
    }

    & > input {
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
    }
  `;

  const
    subscribe = connect(),
    propTypes = { dispatch: PropTypes.func.isRequired };

export function AddTodoPresentation({ dispatch }) {
  // Custom hook:
  const input = todos.useAddTodo(dispatch);

  return (
    <Header>
      <h1>todos</h1>
      <input name="todo" placeholder="What needs to be done?" {...input} />
    </Header>
  );
}
AddTodoPresentation.propTypes = propTypes;

export default subscribe(AddTodoPresentation);
