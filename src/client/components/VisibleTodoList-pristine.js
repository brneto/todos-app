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
    : <OnProgress>You have nothing to do yet!</OnProgress>;

  if (error)
    render = <FetchError error={error} onRetry={() => fetchTodos()} />;

  // TODO: Replace the current "Loading..." approach by React Suspense.
  // https://reactjs.org/docs/concurrent-mode-suspense.html
  if (isFetching)
    render = <OnProgress>Loading...</OnProgress>;

  // TODO: Remove the re-render on the todos list.
  // TODO: Only do the re-render when isFetching prop changes.
  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate
  console.info('VisibleTodoList:Render:', { todos, isFetching, error });
  return <Section>{render}</Section>;
}

VisibleTodoList.propTypes = propTypes;

// const skipRender = (prevProps, nextProps) => prevProps.isFetching === nextProps.isFetching;
// export default subscribe(memo(VisibleTodoList, skipRender));
export default subscribe(VisibleTodoList);
