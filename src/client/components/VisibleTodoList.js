import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  getFilter, getIsFetching,
  getError, getVisibleTodos } from '../redux/reducers';
import { effects } from '../redux/actions';
import TodoList from './TodoList';
// import FetchError from './FetchError';
import ErrorBoundary from './ErrorBoundary';

const
  Section = styled.section`
    position: relative;
    border-top: 1px solid #e6e6e6;
    z-index: 2;
  `,
  OnFetch = styled.p`
    margin-left: 1em;
  `;

function VisibleTodoList(props) {
  const { isFetching, error, fetchTodos, toggleTodo, todos, filter } = props;

  // https://github.com/facebook/react/issues/14920
  useEffect(
    () => void fetchTodos(),
    [fetchTodos, filter]
  );

  // TODO: Selecting a different filter, before the component shows "Loading...",
  // TODO: it can be seen a quick glitch. Find a solution to this issue.
  let render = (
    <ErrorBoundary onRetry={fetchTodos}>
      <TodoList todos={todos} onTodoClick={toggleTodo} error={error} />
    </ErrorBoundary>
  );

  // TODO: Replace the current approach by using the react Suspense component.
  // https://reactjs.org/docs/concurrent-mode-suspense.html
  if(isFetching) render = <OnFetch>Loading...</OnFetch>;

  return <Section>{render}</Section>;
}
VisibleTodoList.propTypes = {
  fetchTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  todos: PropTypes.array.isRequired,
  error: PropTypes.objectOf(Error),
};

const
  mapStateToProps = state => ({
    filter: getFilter(state),
    isFetching: getIsFetching(state),
    error: getError(state),
    todos: getVisibleTodos(state),
  }),
  mapDispatchToProps = {
    fetchTodos: effects.fetchTodos,
    toggleTodo: effects.toggleTodo,
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList);
