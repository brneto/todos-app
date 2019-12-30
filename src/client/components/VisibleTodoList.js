import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  getFilter,
  getIsFetching,
  getErrorMessage,
  getVisibleTodos } from '../redux/reducers';
import { effects } from '../redux/actions';
import TodoList from './TodoList';
import FetchError from './FetchError';

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
  const { isFetching, errorMessage, fetchTodos, toggleTodo, todos, filter } = props;

  useEffect(
    // eslint-disable-next-line no-console
    () => console.info('[INFO:', 'VisibleTodoList on effect]') ?? void fetchTodos(),
    // https://github.com/facebook/react/issues/14920
    [fetchTodos, filter]
  );

  // TODO: Selecting a different filter, before the component shows "Loading...",
  // TODO: it can be seen a quick glitch. Find a solution to this issue.
  let
    render = <TodoList todos={todos} onTodoClick={toggleTodo} />,
    element = 'todos';

  // TODO: Replace this approach by the React ErrorBoundary component.
  // https://reactjs.org/docs/error-boundaries.html
  if(errorMessage)
    render = (element = 'error') && <FetchError message={errorMessage} onRetry={fetchTodos} />;

  // TODO: Replace the current approach by using the react Suspense component.
  // https://reactjs.org/docs/concurrent-mode-suspense.html
  if(isFetching)
    render = (element = 'loading') && <OnFetch>Loading...</OnFetch>;

  // eslint-disable-next-line no-console
  console.info('[INFO: VisibleTodoList Render', element, 'props:', props, ']');
  return <Section>{render}</Section>;
}
VisibleTodoList.propTypes = {
  fetchTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  todos: PropTypes.array.isRequired,
};

const
  mapStateToProps = state => ({
    filter: getFilter(state),
    isFetching: getIsFetching(state),
    errorMessage: getErrorMessage(state),
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
