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
  let render = null;

  useEffect(
    // eslint-disable-next-line no-console
    () => console.info('INFO:', 'VisibleTodoList rendering...') ?? void fetchTodos(),
    // https://github.com/facebook/react/issues/14920
    [fetchTodos, filter]
  );

  // TODO: After select a different filter before the component start to show the Loading...
  // TODO: message there a quick glitch before. Find a solution to this issue
  if (todos.length)
    render = <TodoList todos={todos} onTodoClick={toggleTodo} />;

  // TODO: After press the retry button of the FetchError component this component isn't been
  // TODO: re-rendered and therefore not rendering the OnFetch component as well.
  // TODO: Find a solution to this issue and then replace the current approach by using the
  // TODO: react Suspense component.
  // https://reactjs.org/docs/concurrent-mode-suspense.html
  if(isFetching)
    render = <OnFetch>Loading...</OnFetch>;

  // TODO: Replace this approach by the React ErrorBoundary component
  // https://reactjs.org/docs/error-boundaries.html
  if(errorMessage)
    render = <FetchError message={errorMessage} onRetry={fetchTodos} />;

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
