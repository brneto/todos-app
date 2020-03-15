import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { effects } from '../redux/actions';
import {
  getFetchStatus,
  getError,
  getVisibleTodos } from '../redux/reducers';
import TodoList from './TodoList';
import LoadingDots from './LoadingDots';
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
    status: getFetchStatus(state),
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
    status: PropTypes.object.isRequired,
    error: PropTypes.instanceOf(Error),
    fetchTodos: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

// https://kentcdodds.com/blog/stop-using-isloading-booleans
function VisibleTodoList({
  todos, status, error,
  fetchTodos, toggleTodo,
}) {
  // https://github.com/facebook/react/issues/14920
  useEffect(() => void fetchTodos(), [fetchTodos]);

  let render = <OnProgress>Nothing has been fetched yet!</OnProgress>;

  if (status.isLoading) render = (
    <OnProgress>
      <LoadingDots>Loading</LoadingDots>
    </OnProgress>
  );

  if (status.isResolved) render = todos.length
    ? <TodoList todos={todos} onClick={toggleTodo} />
    : <OnProgress>You have nothing to do yet!</OnProgress>;

  if (status.isRejected) render = <FetchError error={error} onRetry={() => fetchTodos()} />;

  return <Section>{render}</Section>;
}
VisibleTodoList.propTypes = propTypes;

export default subscribe(VisibleTodoList);
