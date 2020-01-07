import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { effects } from '../redux/actions';
import {
  getIsFetching,
  getError,
  getVisibleTodos } from '../redux/reducers';
import TodoList from './TodoList';
import FetchError from './FetchError';

// TODO: First replace by object notation
// TODO: https://www.styled-components.com/docs/advanced#style-objects
// TODO: Then experiment replace styled-components by Emotion
// TODO: https://emotion.sh/docs/introduction
// TODO: styled-components vs emotion
// TODO: https://github.com/jsjoeio/styled-components-vs-emotion/blob/master/README.md
const
  OnProgress = styled.p`
    margin-left: 1em;
  `,
  Section = styled.section`
    position: relative;
    border-top: 1px solid #e6e6e6;
    z-index: 2;
  `;

const
  mapStateToProps = state => ({
    todos: getVisibleTodos(state),
    isFetching: getIsFetching(state),
    error: getError(state),
  }),
  mapDispatchToProps = {
    fetchTodos: effects.fetchTodos,
    toggleTodo: effects.toggleTodo,
  },
  subscribe = connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  propTypes = {
    todos: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.objectOf(Error),
    fetchTodos: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

function VisibleTodoList({
  todos, isFetching, error,
  fetchTodos, toggleTodo
}) {

  let render = todos.length
    ? <TodoList todos={todos} onClick={toggleTodo} />
    : <OnProgress>Nothing to be done yet?!</OnProgress>;

  if (error)
    render = <FetchError error={error} onRetry={fetchTodos} />;

  // TODO: Replace the current "Loading..." approach by React Suspense.
  // https://reactjs.org/docs/concurrent-mode-suspense.html
  if (isFetching)
    render = <OnProgress>Loading...</OnProgress>;

  return <Section>{render}</Section>;
}

VisibleTodoList.propTypes = propTypes;

export default subscribe(VisibleTodoList);
