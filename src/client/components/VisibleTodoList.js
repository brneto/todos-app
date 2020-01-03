import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { effects } from '../redux/actions';
import {
  getIsFetching, getError,
  getVisibleTodos, getFilter } from '../redux/reducers';
import TodoList from './TodoList';
import FetchError from './FetchError';

const
  OnFetch = styled.p`
    margin-left: 1em;
  `,
  Section = styled.section`
    position: relative;
    border-top: 1px solid #e6e6e6;
    z-index: 2;
  `;

const
  mapStateToProps = state => ({
    filter: getFilter(state),
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
    filter: PropTypes.string.isRequired,
    todos: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.objectOf(Error),
    fetchTodos: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

function VisibleTodoList({
  filter, todos, isFetching,
  error, fetchTodos, toggleTodo
}) {
  // TODO: Replace the current "Loading..." approach by React Suspense.
  // https://reactjs.org/docs/concurrent-mode-suspense.html

  useEffect(
    () => void fetchTodos(),
    [fetchTodos, filter] // https://github.com/facebook/react/issues/14920
  );

  let
    render = todos.length && <TodoList todos={todos} onClick={toggleTodo} />;

  if (error)
    render = <FetchError error={error} onRetry={fetchTodos} />;

  if (isFetching)
    render = <OnFetch>Loading...</OnFetch>;

  return <Section>{render}</Section>;
}

VisibleTodoList.propTypes = propTypes;

export default subscribe(VisibleTodoList);
