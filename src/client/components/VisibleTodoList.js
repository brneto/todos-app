import React, { useEffect } from 'react';
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
    error: PropTypes.instanceOf(Error),
    fetchTodos: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

function VisibleTodoList({
  todos, isFetching, error,
  fetchTodos, toggleTodo
}) {
  // https://github.com/facebook/react/issues/14920
  useEffect(() => void fetchTodos(), [fetchTodos]);

  let render = todos.length
    ? <TodoList todos={todos} onClick={toggleTodo} />
    : <OnProgress>You have nothing to do yet!</OnProgress>;

  if (error)
    render = <FetchError error={error} onRetry={() => fetchTodos()} />;

  if (isFetching)
    render = <OnProgress>Loading...</OnProgress>;

  return <Section>{render}</Section>;
}
VisibleTodoList.propTypes = propTypes;

export default subscribe(VisibleTodoList);
